import React, { useContext, useMemo, useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../firebase/config";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where, } from "firebase/firestore";

function DebounceSelect({fetchOptions, debounceTimeOut =300, ...props}){
    //search
    const [fetching, setFetching] = useState(false); //loading
    const [options, setOptions]= useState([]); //ket qua tra ve khi search
    const debounceFetcher = useMemo(()=>{
        const loadOptions = (value)=>{
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions=>{
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeOut)
    },[debounceTimeOut, fetchOptions])
    return (
        <Select 
            labelInValue 
            filterOption={false}
            showSearch={true}
            showArrow={false}
            onSearch={debounceFetcher}
            notFoundContent= {fetching ? <Spin size="small"/> : null }
            {...props}
        >
            {
                options.map(option=>(
                    <Select.Option key={option.value} value={option.value} title = {option.label}>
                        <Avatar size={'small'} src ={ option.photoURL}>
                            {option.photoURL ? '' : option.label?.charAt(0).toUpperCase()}
                        </Avatar>
                        {` ${option.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}   
async function fetchUserList(search, curMembers){
    const colRef = collection(db, 'users');
    const q = query(colRef, where('keywords', 'array-contains', search ), orderBy('displayName'), limit(20))
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc)=>(
        {
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        }
    ))
    return result.filter(opt=>!curMembers.includes(opt.value));
}
export default function InviteMemberModal() {
    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext)
    const {user:{uid}} = useContext(AuthContext)
    const [value, setValue] = useState([])
    const [form]= Form.useForm()


  
  const handleOK = async () => {
    //add new room to firestore
    const docRef = doc(db, 'rooms', selectedRoomId)
    await updateDoc(docRef, {
        members: [
            ...selectedRoom.members, ...value.map(val=>(
                val.value
            ))
        ]
    })
   
    //
    
    //reset form value
    form.resetFields()




    setIsInviteMemberVisible(false)
  };
  const handleCancel = () => {
    form.resetFields()
    setIsInviteMemberVisible(false)
  };
  
  return (
    <div>
      <Modal
        title="Mời bạn"
        visible={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect 
            mode='multiple'
            label='Tên các thành viên'
            value = {value}
            placeholder ="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange = {newValue =>setValue(newValue)}
            style = {{width: '100%'}}
            curMembers = {selectedRoom.members}
        />
        </Form>
      </Modal>
    </div>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Form, InputGroup, Stack } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import Gravatar from "react-gravatar"
import validator from "email-validator";
import { SMRT16Context } from "../SMRT16Context";
import { saveDBRecord } from "../Utils/user";
import useSWR from "swr";


/**
 * 
 * @param { id} props 
 * id - address of my wallet 
 * 
 */
export default function ProfileWidget(props) {
    const context = useContext(SMRT16Context);
    const apiUrl = TheData.APIuser+context.r.addr;
    const { data, error } = useSWR(
        apiUrl,
        fetcher
      );

    const [userName, setUserName] = useLocalStorage(context.r.addr+'userName','');
    const [userEmail, setUserEmail] = useLocalStorage(context.r.addr+'userEmail','');

    const [nameColor, setNameColor] = useState('white');
    const [emailColor, setEmailColor] = useState('white');

    //const [emailVerification, setEmailVerification] = useState(null);

    const [nameMsg, setNameMsg] = useState(<>&nbsp;</>);
    const [emailMsg, setEmailMsg] = useState(<>&nbsp;</>);
    const [emailContinueChange, setEmailContinueChange] = useState(false);


    const [errorMsg, setErrorMsg] = useState(<>&nbsp;</>);

    
   

    const handleNameSave = async ()=> {
        setNameColor('white');
        setNameMsg(<span className="pageinfo">wait...</span>);
        if(await saveDBRecord(props.id, {name:userName}, (m)=>{
            setNameMsg(<span className="pageinfo">{m}</span>);
        })) {
            setNameMsg(<span className="pageinfo">saved</span>);
        }
        
    }

    const handleEmailSave = async()=> {
        setEmailColor('white');
        setEmailMsg(<span className="pageinfo">wait...</span>);
        if(await saveDBRecord(props.id, {email:userEmail}, (m)=>{
            setEmailMsg(<span className="pageinfo">{m}</span>);
        })) {
            setEmailMsg(<span className="pageinfo">saved</span>);
            setEmailContinueChange(false);
        }
    }


    const handleNameChange = (e)=> {
        const val = e.target.value+'';
        console.log('handleNameChange',val);
        setUserName(val);
        if(val.length>0 && +val != val && val.length<24) {
            setNameMsg(<>&nbsp;</>);
            setNameColor('green');
        } else {
            setNameColor('white');
        }
    }

    const handleEmailChange = (e)=> {
        const val = e.target.value+'';
        console.log('handleEmailChange',val);
        setUserEmail(val);
        setEmailContinueChange(true);
        if(validator.validate(val)) {
            setEmailMsg(<>&nbsp;</>);
            setEmailColor('green');
        } else {
            setEmailColor('white');
        }
    }

    

    useEffect(() => {
            //console.log("getUser",data,error,apiUrl);
            if(data) {
                if(data.name) {
                    setUserName(data.name);
                }
                if(data.email) {
                    setUserEmail(data.email);
                }
            }

    },[data,error]);




    return (
        <Card title="Profile Widget">
        <Card.Body>
        <Card.Title>Your profile</Card.Title>
            
        <div className="avatar">
            {emailColor!='white' || emailContinueChange || !userEmail? 
                <img src="/assets/avatar.png" width={60} height={60}
                    style={{margin: '20px', borderRadius: '50%'}} />
                :<Gravatar default="identicon" 
                    email={userEmail}
                    size={60} 
                    style={{margin: '20px', borderRadius: '50%'}} />
            }
        </div>

        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="username-addon">Name:</InputGroup.Text>
            <Form.Control
                placeholder="Enter your name"
                aria-label="Username"
                aria-describedby="username-addon"
                onChange={handleNameChange}
                value={userName} 
            />
            {nameColor!='white' ? <Button 
                onClick={handleNameSave}
                variant="outline-secondary">
                    Save
                </Button>:<InputGroup.Text>{nameMsg}</InputGroup.Text>
            }
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="email-addon">Email:</InputGroup.Text>
            <Form.Control
                placeholder="Enter your email"
                aria-label="Useremail"
                aria-describedby="email-addon"
                onChange={handleEmailChange}
                value={userEmail}
            />
            {emailColor!='white' ?<Button 
                    onClick={handleEmailSave}
                    variant="outline-secondary">
                    Save
                </Button>:<InputGroup.Text>{emailMsg}</InputGroup.Text>
                }
        </InputGroup>

{/* 
        <Stack id="usrname" direction="horizontal" gap={2}>
            


            <div>
                <p>
                {nameColor!='white' ? 
                    <button onClick={handleNameSave}
                        className="btn bt-btn btn-sm btn-outline-secondary">
                        save
                    </button>:nameMsg
                    }
                </p>
            </div>
        </Stack>
        <Stack id="usremail" direction="horizontal" gap={2}>
            <div>
                {emailColor!='white' ? <button 
                    onClick={handleEmailSave}
                    className="btn bt-btn btn-sm btn-outline-secondary">
                        save
                </button>:emailMsg
                }
            </div>
        </Stack> */}

        {errorMsg}
        
    </Card.Body>
        
    </Card>
        
    );
}
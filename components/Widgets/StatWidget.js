
import { Card, Col,  Row } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";

// import { collection, getDocs, doc, query, where, getDoc } from "firebase/firestore";
// import { db } from "../../components/firebase.js";

import moment from "moment";
import { SMRT16Context } from "../SMRT16Context.js";
import { TheLang } from "../../data/lang.js";
import { TheData } from "../../data/data.js";


export default function StatWidget(props) {
    const context = useContext(SMRT16Context);
    const { id } = context.r;

  const [stLine, setStLine] = useState('');
  const [stObj, setStObj] = useState({});


  let status = {};

  const unload = async (id,obj,lvl)=>{
    try {
      const addr = (''+id).toLocaleLowerCase();
      const usersRef = collection(db, "Users");
      obj.name = addr;
      obj.data = await getDoc(doc(db, 'Users', addr)).then((d)=>{
        if(d.exists) return d.data();
        return {};
      });
      obj.lvl = lvl;
      if(TheData.developerAddress!=addr) {
        const q = query(usersRef, where("referrer", "==", addr));
        const querySnapshot = await getDocs(q);
        let cnt = querySnapshot.docs.length;
        obj.count = cnt;
        if(obj.count) obj.children = [];
        console.log("Create a query against the collection.",addr,cnt);
        querySnapshot.forEach(async (d) => {
          console.log('Iteration', cnt);
          let uid = d.id;
          let data = d.data();
          let new_obj = {name:uid, data};
          if(lvl<4) 
            await unload(uid, new_obj, lvl+1);
          obj.children.push(new_obj);
          console.log('Pushed', new_obj);
          cnt--;
          setStLine(JSON.stringify(status));
          setStObj(status);
        });
      } else {
        console.log('Dont deal with it');
      }
      

    } catch(ex) {
      status.error = ex.message;
      setStLine(JSON.stringify(status));
    }
    

  }

  useEffect(()=>{

    if(id)unload(id, status, 0);
    
  },[id]);

  const renderChildren = (obj) => {
    return <>
    {obj.children? <div className={"lvl"+obj.lvl} >
        {TheLang.StatWidget.level} {obj.lvl}, count: {obj.count} referrals of &quot;{obj.data.name}&quot;
          <ol>
              {obj.children.map((item0, idx0)=>
              <li key={idx0}>
                <a href={"/stat/"+item0.name}>{item0.name}</a> ({item0.data.lastVisit? <>{moment(item0.data.lastVisit.toDate()).fromNow()}</>:<>-</>}) &quot;{item0.data.name}&quot;
                {item0.children?
                  <div className="children">
                    {renderChildren(item0)}
                  </div>
                :<>-</>}
                
              </li>)}
          </ol>  
        </div>:<>{TheLang.StatWidget.noRefs}</>}
    </>;
  }

  return (
    <>
        <Card>
            
            <Card.Body>
            
                {renderChildren(stObj,null)}
            </Card.Body>
     
        </Card>

    </>
  );
}

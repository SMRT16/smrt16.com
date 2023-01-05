import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import ErrorsDisplay from "../components/ErrorsDisplay";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Topbar from "../components/Header/Topbar";
import MyContent from "../components/ID/MyContent";
import TheirsContent from "../components/ID/TheirsContent";
import RedirectWrapper from "../components/RedirectWrapper";
import { SMRT16Context } from "../components/SMRT16Context";

export default function IDPage() {
    const router = useRouter();
    const { id } = router.query;
    const context = useContext(SMRT16Context);
    


    useEffect(()=>{
      if(id && context.r.id!=id) {
        console.log('let context to know about the navigation');
        context.SMRT16dispatch({id});
        let a = [];
        for (let i = 0; i < context.r.errors.length; i++) {
          const element = context.r.errors[i];
          
        }
      }
    },[context]);
  
    return (
      <>
        <Header />
        <Topbar id={id} />
        <RedirectWrapper id={id}>
          <Container>
            
            <ErrorsDisplay />
            
            {!id ? <>
              <Skeleton xs={16} />
            </>:<>
              <div style={{minHeight:"80vh"}}>
                {context.r.addr? <>
                  {context.r.isMyPage?<>
                    <MyContent />
                  </>:<>
                  {/* <p>It's not my page, but welcome {context.r.addr} {context.r.isMyPage+' '+context.r.id}</p> */}
  
                    <TheirsContent />
                  </>}
                </>:<>
                    <Skeleton count={8}/>
                </>}
              </div>
            </>}
          </Container>
        </RedirectWrapper>
        <Footer />
      </>
    );
  }

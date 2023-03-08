import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
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
  const context = useContext(SMRT16Context);
  const { id } = router.query;



  useEffect(() => {
    
    if (id && context.r.id != id) {
      console.log('let context to know about the navigation');
      context.SMRT16dispatch({ id });
      let a = [];
      for (let i = 0; i < context.r.errors.length; i++) {
        const element = context.r.errors[i];

      }
    }
  }, [context,id]);

  return (
    <>
      <Header />
      <Topbar id={id} />
      <RedirectWrapper id={id}>
        <Container>

          <ErrorsDisplay />

          {!id || !context.r.isPolygon ? <>

            {!context.r.isPolygon && <Card>
              <Card.Body>
                <div className="notPolygon">Please, switch your MetaMask to Polygon main net!</div>
              </Card.Body>
            </Card>}

            <Skeleton />
          </> : <>
            <div style={{ minHeight: "80vh" }}>
              {context.r.addr ? <>
                {context.r.isMyPage ? <>
                  <MyContent />
                </> : <>
                  <TheirsContent />
                </>}
              </> : <>
                <Skeleton count={8} />
              </>}
            </div>
          </>}
        </Container>
      </RedirectWrapper>
      <Footer />
    </>
  );
}

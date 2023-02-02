import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import Topbar from "../../components/Header/Topbar";


export default function IDStat() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Header />
            <Topbar id={id} />
            <Skeleton />
            <Footer />
        </>
    );

}
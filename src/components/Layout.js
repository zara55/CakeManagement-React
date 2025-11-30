import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
function Layout(){
      const [searchItem, setSearchItem] = useState(""); // search state

    return(
<div style={{ backgroundColor: "#f8f9fa" }}>
          <Header searchItem={searchItem} setSearchItem={setSearchItem} />
        <main>
             {/* Pass searchItem as prop to child components rendered by Outlet */}
 <Outlet context={{ searchItem, setSearchItem }} />
         </main>
        <Footer />
       </div>
    )
}
export default Layout;
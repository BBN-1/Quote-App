import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import Details from "./components/Details/Details";
import NotFound from "./components/404/NotFound";
import Logout from "./components/Logout/Logout";
import EditComment from "./components/EditComment/EditComment";
import PrivateGuard from "./components/Common/PrivateGuard";
import PublicGuard from "./components/Common/PublicGuard";
import Author from "./components/Author/Author";
import ProfilePosts from "./components/Profile/ProfilePosts/ProfilePosts";
import ProfileComments from "./components/Profile/ProfileComments/ProfileComments";
import { GameProvider } from "./contexts/GameContext"

function App() {
    return (
        <AuthProvider>
             <GameProvider>
            <div className="App">
                <Header />
            <div className="main-content"> 
           
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<PrivateGuard />}>
                        <Route path="/create" element={<Create />} />
                        <Route
                            path="/comment/edit/:commentId"
                            element={<EditComment />}
                        />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/profile/posts" element={<ProfilePosts />} />
                        <Route path="/profile/comments" element={<ProfileComments />} />
                        <Route path="/quote/edit/:quoteId" element={<Edit />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                    <Route element={<PublicGuard />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:quoteId" element={<Details />} />
                    <Route path="/author/:authorId" element={<Author />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
               
            </div>
   
                <Footer/>
            </div>
            </GameProvider>
        </AuthProvider>
        
    );
}

export default App;

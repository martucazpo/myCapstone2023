import { Outlet, Link, useLocation } from "react-router-dom"
import { connect } from "react-redux"


const PrivateNavbar = (props) => {
    const { pathname } = useLocation()
    return (
        <>
            <nav>
                {pathname !== "/home" && <Link to="/home">HOME</Link>}
                {pathname !== "/todos" && <Link to="/todos">TODOS</Link>}
                {pathname !== "/contacts" && <Link to="/contacts">CONTACTS</Link>}
                {pathname !== "/posts" && <Link to="/posts">POSTS</Link>}
                { props.auth.user.role === "Admin" && <button>ADMIN</button>}
            </nav>
            <Outlet />
        </>
    )
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNavbar)
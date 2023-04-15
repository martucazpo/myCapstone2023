import { Navigate, Outlet } from "react-router-dom"
import { connect } from "react-redux"


const PublicRoute = (props) => {
    return (
        <>
            {props.auth.isAuth ? <Navigate to="/home" /> : <Outlet />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(PublicRoute)
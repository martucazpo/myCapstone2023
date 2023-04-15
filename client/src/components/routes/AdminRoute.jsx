import { Navigate, Outlet } from "react-router-dom"
import { connect } from "react-redux"


const AdminRoute = (props) => {
    return (
        <>
            { (props.auth.isAuth && props.auth.isAdmin) ? <Outlet /> : (!props.auth.isAuth) ? <Navigate to="/"/> : <Navigate to="/home" /> }
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AdminRoute)
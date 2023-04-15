import { connect } from "react-redux"
import actions from "../../utils/redux/actions"

const Header = (props) =>{
    return (
        <header>
            <span>
                { props.auth.isAuth ? <h3>Welcome { props.auth.user.firstName }</h3> : <h3>Welcome</h3>}
            </span>
            <span>
                { props.auth.isAuth ? <form><button>LOGOUT</button></form> : <button>LOGIN</button> }
            </span>
        </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
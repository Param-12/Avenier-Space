import {Link} from 'react-router-dom';
import './header.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

function Header(props){

    function handleClick(e){
        if(props.newLiked && props.newLiked !== "first load"){
            fetch('/discover',{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({email: props.loginInfo.email, newLiked: props.newLiked})
            });
        }
    }

    return <header>
        <div className='headingContainer'>
            <h1>Avenier Space</h1>
        </div>
        <nav onClick={handleClick}>
            <div className='navLinks'>
                <Link to='/'>Home</Link>
                <Link to='/discover'>Discover</Link>
            </div>
            {props.loginInfo.loggedIn ? <div className='loggedOn'>
                <Link to={'/portfolio/'+props.loginInfo.id}><AccountCircleRoundedIcon className="profile"/></Link>
                <Link to='/cart'><ShoppingCartRoundedIcon/></Link>
            </div>  : <div className="loggedOff">
                <Link to="/signup">Signup</Link>
                <Link to="/signin">Login</Link>
            </div>}
        </nav>
    </header>
}

export default Header;
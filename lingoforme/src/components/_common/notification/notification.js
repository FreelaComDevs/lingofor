import { Notification } from './styles';
import { FaRegBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { useEffect } from 'react';
import { getUserNotifications } from "../../../actions/notificationActions";

const NotificationPLace = ({ children, notifications, getUserNotifications }) => {    
    useEffect(()=>{        
        if ( !notifications.loading ) {
            getUserNotifications({id:3022, pageNumber:1, pageSize: 9999 })
        }        
    },[])
    const unreadTotal = notifications?.userNotifications?.items?.reduce((acc, notification)=>{
        if ( !notification.read ) acc += 1
        return acc
    }, 0) || 0
    return (
        <Notification>
            <Link to={"/notifications"}>
                <div className='relative'>
                    <FaRegBell className='bell-icon' />
                    <span className='notification'>{unreadTotal}</span>
                </div>
            </Link>
        </Notification>
    )
};

const mapStateToProps = ({ notifications }) => ({ notifications });
const mapDispatchToProps = dispatch => ({
    getUserNotifications: data => dispatch(getUserNotifications(data)),
    setNotificationMessage: data => dispatch(setNotificationMessage(data)),
    unsetNotificationMessage: data => dispatch(unsetNotificationMessage(data))
  });

export const NotificationArea = connect( mapStateToProps, mapDispatchToProps )(NotificationPLace);
import './ChatAll.css';

function Messege({ data }) {

        return <div id='Messege'>
                <div className={(data.e.user.email == data.user.email)?"spanRight":"spanLeft"}>{data.e.user.username}</div>
                <div className={(data.e.user.email == data.user.email) ? "messageOwner" : "messageOpp"}>
                        <div className="text">
                                {data.e.message}
                        </div>
                </div>
        </div>;
}

export default Messege;
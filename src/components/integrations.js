import React from 'react'
import { Link } from "gatsby"
import RingoStat from "../components/ringostat";

class Integrations extends React.Component {

    state = {
        currentContent : 1
    }

	render(){
		return(
            <div className='analytics-page'>
                <div className='default-container' style={{height: `100%`}}>
                    <div className='flex-row'>
                        <div className='col-3 flex-column sidebar'>
                            <div className='sidebar-item page-title'>
                                Интеграции
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 1 })} className={`clickable ` + (this.state.currentContent === 1 && "active-clickable")}>1С</Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 2 })} className={`clickable ` + (this.state.currentContent === 7 && "active-clickable")}> RingoStat </Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 3 })} className={`clickable ` + (this.state.currentContent === 2 && "active-clickable")}>WebKassa</Link>
                            </div>
                        </div>
                        <div className='col-9 analytics-content'>
                            { this.state.currentContent === 2 && <RingoStat></RingoStat>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Integrations
import React from 'react'
import { Link } from 'gatsby';
import AnalyzProdazh from "../components/analyzprodazh"
import SvodnyOtchet from "../components/analyzprodazh"
import OtchetPoSotrudnikam from "../components/analyzprodazh"
import SpisokSobity from "../components/analyzprodazh"
import Calls from "../components/analyzprodazh"
import Goals from "../components/analyzprodazh"
import Sklady from "../components/sklady-analytics"

class Analytics extends React.Component {

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
                                аналитика
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 1 })} className={`clickable ` + (this.state.currentContent === 1 && "active-clickable")}>Анализ продаж</Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 7 })} className={`clickable ` + (this.state.currentContent === 7 && "active-clickable")}> Склады </Link>
                            </div>
                            {/* <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 2 })} className={`clickable ` + (this.state.currentContent === 2 && "active-clickable")}>Сводный отчет</Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 3 })} className={`clickable ` + (this.state.currentContent === 3 && "active-clickable")}>Отчет по сотрудникам</Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 4 })} className={`clickable ` + (this.state.currentContent === 4 && "active-clickable")}>Список событий</Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 5 })} className={`clickable ` + (this.state.currentContent === 5 && "active-clickable")}> Звонки  </Link>
                            </div>
                            <div className='sidebar-item'>
                                <Link to='' onClick={() => this.setState({ currentContent : 6 })} className={`clickable ` + (this.state.currentContent === 6 && "active-clickable")}> Цели </Link> */}
                            {/* </div> */}
                        </div>
                        <div className='col-9 analytics-content'>
                            { this.state.currentContent === 1 && <AnalyzProdazh></AnalyzProdazh>}
                            { this.state.currentContent === 2 && <SvodnyOtchet></SvodnyOtchet>}
                            { this.state.currentContent === 3 && <OtchetPoSotrudnikam></OtchetPoSotrudnikam>}
                            { this.state.currentContent === 4 && <SpisokSobity></SpisokSobity>}
                            { this.state.currentContent === 5 && <Calls></Calls>}
                            { this.state.currentContent === 6 && <Goals></Goals>}
                            { this.state.currentContent === 7 && <Sklady></Sklady>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Analytics
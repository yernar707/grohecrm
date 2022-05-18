import React from 'react'

class AnalyzProdazh extends React.Component {

    state = {
        skladId : 0,
    }
    
	render(){
		return(
            <div className='analytics-right-content'>
                { this.state.skladId !== 0 && <div onClick={() => this.setState({ skladId : 0 })} className='dark-bg'></div> }
                <div className='content-title'>
                    СКЛАДЫ
                </div>
                <div className='sklad-analytics-container'>
                    <div className='flex-row'>
                        <div className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    Склад  №1
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                        ул. Байзакова 267а
                                        </p>
                                        <p className='sklad-info'>
                                        1500 элемента
                                        </p>
                                        <button onClick={() => this.setState({ skladId : 1 })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    Склад  №2
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                        ул. Байзакова 267а
                                        </p>
                                        <p className='sklad-info'>
                                        1500 элемента
                                        </p>
                                        <button onClick={() => this.setState({ skladId : 2 })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    Склад  №3
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                        ул. Байзакова 267а
                                        </p>
                                        <p className='sklad-info'>
                                        1500 элемента
                                        </p>
                                        <button onClick={() => this.setState({ skladId : 3 })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    Склад  №4
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                        ул. Байзакова 267а
                                        </p>
                                        <p className='sklad-info'>
                                        1500 элемента
                                        </p>
                                        <button onClick={() => this.setState({ skladId : 4 })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    Склад  №5
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                        ул. Байзакова 267а
                                        </p>
                                        <p className='sklad-info'>
                                        1500 элемента
                                        </p>
                                        <button onClick={() => this.setState({ skladId : 5 })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>
                        {this.state.skladId !== 0 && <div style={{ top : 50, background : "#E5E5E5", width: 1100}} className='sklad-modal'>
                            <span onClick={() => {this.setState({ skladId : 0 }); this.setState({ changeSkladmen : false })}} className='close-modal'>×</span>
                            <div className='sklad-modal-title'>
                                Склад  №{this.state.skladId}
                            </div>
                            <div className='sklad-modal-content'>
                                <div className='flex-row'>
                                    <div className='col-5 sklad-modal-card-outer'>
                                        <div className='sklad-modal-card'>
                                            <div className='sklad-modal-card-title'>
                                                Количество сделок
                                            </div>
                                            <div className='sklad-modal-card-quantity'>
                                                52
                                            </div>
                                            <div className='sklad-modal-card-bottom'>
                                                за неделю
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-row'>
                                    <div className='col-4 sklad-modal-card-outer'>
                                        <div className='sklad-modal-card'>
                                            <div className='sklad-modal-card-title'>
                                                Заработок
                                            </div>
                                            <div className='sklad-modal-card-income'>
                                                1 150 000 тг
                                            </div>
                                            <div className='sklad-modal-card-bottom'>
                                                за месяц
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4 sklad-modal-card-outer'>
                                        <div className='sklad-modal-card'>
                                            <div className='sklad-modal-card-title'>
                                                Расход
                                            </div>
                                            <div className='sklad-modal-card-expenses'>
                                                540 000 тг
                                            </div>
                                            <div className='sklad-modal-card-bottom'>
                                                за месяц
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4 sklad-modal-card-outer'>
                                        <div className='sklad-modal-card'>
                                            <div className='sklad-modal-card-title'>
                                                Чистая прибыль
                                            </div>
                                            <div className='sklad-modal-card-profit'>
                                                610 000 тг
                                            </div>
                                            <div className='sklad-modal-card-bottom'>
                                                за месяц
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default AnalyzProdazh
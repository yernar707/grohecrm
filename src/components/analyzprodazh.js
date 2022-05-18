import React from 'react'

class AnalyzProdazh extends React.Component {

    state = {
        currentContent : 1
    }

	render(){
		return(
            <div className='analytics-right-content'>
                <div className='content-title'>
                    АНАЛИЗ ПРОДАЖ 
                </div>
                <div className='analytics-container'>
                    <div className='flex-row card'>
                        <div style={{
                            display: `flex`,
                            flexDirection: `column`,
                            justifyContent: `center`
                        }} className='col-1 border-right'>
                            <p className='card-uppercase'>НОВЫЕ</p>
                            <p className='card-bignum'>1</p>
                        </div>
                        <div className='col-2 stages flex-column justify-content-between'>
                            <p className='card-uppercase'>Сейчас</p>
                            <p className='card-uppercase'>перешли</p>
                            <p className='card-uppercase'>потерянные</p>
                        </div>
                        <div className='col-9 scroll-box'>
                            <div className='analytics-small-card'>
                                <div className='analytics-small-card-top'>
                                    <hr className='highlighted-top blue-bg'></hr>
                                    <div className='analytics-small-card-title'>
                                        <p>Первичный контакт</p>
                                        <p>0 сделок </p>
                                        <p>0 тг</p>
                                    </div>
                                    <div className='analytics-small-card-content'>
                                        <div>
                                            <p className='sdelki'>0</p> сделок
                                        </div>
                                        <div>
                                            <p className='money'>0</p> тенге
                                        </div>
                                    </div>
                                </div>
                                <div className='analytics-small-card-bottom'>
                                    0 сделок 0 тг
                                </div>
                            </div>
                            <div className='analytics-small-card'>
                                <div className='analytics-small-card-top'>
                                    <hr className='highlighted-top yellow-bg'></hr>
                                    <div className='analytics-small-card-title'>
                                        <p>Первичный контакт</p>
                                        <p>0 сделок </p>
                                        <p>0 тг</p>
                                    </div>
                                    <div className='analytics-small-card-content'>
                                        <div>
                                            <p className='sdelki'>0</p> сделок
                                        </div>
                                        <div>
                                            <p className='money'>0</p> тенге
                                        </div>
                                    </div>
                                </div>
                                <div className='analytics-small-card-bottom'>
                                    0 сделок 0 тг
                                </div>
                            </div>
                            <div className='analytics-small-card'>
                                <div className='analytics-small-card-top'>
                                    <hr className='highlighted-top orange-bg'></hr>
                                    <div className='analytics-small-card-title'>
                                        <p>Первичный контакт</p>
                                        <p>0 сделок </p>
                                        <p>0 тг</p>
                                    </div>
                                    <div className='analytics-small-card-content'>
                                        <div>
                                            <p className='sdelki'>0</p> сделок
                                        </div>
                                        <div>
                                            <p className='money'>0</p> тенге
                                        </div>
                                    </div>
                                </div>
                                <div className='analytics-small-card-bottom'>
                                    0 сделок 0 тг
                                </div>
                            </div>
                            <div className='analytics-small-card'>
                                <div className='analytics-small-card-top'>
                                    <hr className='highlighted-top pink-bg'></hr>
                                    <div className='analytics-small-card-title'>
                                        <p>Первичный контакт</p>
                                        <p>0 сделок </p>
                                        <p>0 тг</p>
                                    </div>
                                    <div className='analytics-small-card-content'>
                                        <div>
                                            <p className='sdelki'>0</p> сделок
                                        </div>
                                        <div>
                                            <p className='money'>0</p> тенге
                                        </div>
                                    </div>
                                </div>
                                <div className='analytics-small-card-bottom'>
                                    0 сделок 0 тг
                                </div>
                            </div>
                            <div className='analytics-small-card'>
                                <div className='analytics-small-card-top'>
                                    <hr className='highlighted-top green-bg'></hr>
                                    <div className='analytics-small-card-title'>
                                        <p>Первичный контакт</p>
                                        <p>0 сделок </p>
                                        <p>0 тг</p>
                                    </div>
                                    <div className='analytics-small-card-content'>
                                        <div>
                                            <p className='sdelki'>0</p> сделок
                                        </div>
                                        <div>
                                            <p className='money'>0</p> тенге
                                        </div>
                                    </div>
                                </div>
                                <div className='analytics-small-card-bottom'>
                                    0 сделок 0 тг
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnalyzProdazh
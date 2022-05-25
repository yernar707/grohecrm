import React from 'react'
import { getUser } from '../services/auth'

class AnalyzProdazh extends React.Component {

    state = {
        sklad : [],
        fetchedData : [],
        loading: true,
        fetchedTransactions: [],
        loadingTransactions : true,
    }
    
	render(){
        var url = `https://crohe.herokuapp.com/api/storage/list`
		this.state.loading && fetch(url, { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedData: json,
                loading : false,
            })
        })

        
        var trurl = `https://crohe.herokuapp.com/api/transaction/list`
		this.state.loadingTransactions && fetch(trurl, { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedTransactions: json,
                loadingTransactions : false,
            })
        })

        var filteredSklady = this.state.fetchedData
        
        if(getUser().position == "StorageManager") {
            filteredSklady = filteredSklady.filter(sklad => sklad.staff.id === getUser().id)
        }
		return(
            <div className='analytics-right-content'>
                { this.state.sklad.length !== 0 && <div onClick={() => this.setState({ sklad : [] })} className='dark-bg'></div> }
                <div className='content-title'>
                    СКЛАДЫ
                </div>
                <div className='sklad-analytics-container'>
                    <div className='flex-row'>
                        {
                            !this.state.loading && filteredSklady.map(storage => <div key={storage.id} className='col-4 sklad-column'>
                            <div className='card'>
                                <div className='sklad-title'>
                                    {storage.name}
                                </div>
                                <div className='sklad-content'>
                                        <p className='sklad-address'>
                                            {storage.address}
                                        </p>
                                        <p className='sklad-info'>
                                            {storage.productList.length} элемента
                                        </p>
                                        <button onClick={() => this.setState({ sklad : storage })} className='sklad-show-button'>Показать</button>
                                </div>
                            </div>
                        </div>)
                        }
                        {this.state.sklad.length !== 0 && <div style={{ top : 50, background : "#E5E5E5", width: 1100}} className='sklad-modal'>
                            <span onClick={() => this.setState({ sklad : [] })} className='close-modal'>×</span>
                            <div className='sklad-modal-title'>
                                {this.state.sklad.name}
                            </div>
                            <div className='sklad-modal-content'>
                                <div className='flex-row'>
                                    <div className='col-5 sklad-modal-card-outer'>
                                        <div className='sklad-modal-card'>
                                            <div className='sklad-modal-card-title'>
                                                Количество сделок
                                            </div>
                                            <div className='sklad-modal-card-quantity'>
                                                {
                                                    this.state.fetchedTransactions.length
                                                }
                                            </div>
                                            <div className='sklad-modal-card-bottom'>
                                                {/* за неделю */}
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
                                                {
                                                    this.state.sklad.productList.reduce((partialSum, a) => partialSum + parseInt(a.priceSale) * a.parameter1, 0)
                                                }
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
                                                {
                                                    this.state.sklad.productList.reduce((partialSum, a) => partialSum + parseInt(a.priceBought) * a.parameter1, 0)
                                                }
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
                                                {
                                                    this.state.sklad.productList.reduce((partialSum, a) => partialSum + parseInt(a.priceSale) * a.parameter1, 0) - this.state.sklad.productList.reduce((partialSum, a) => partialSum + parseInt(a.priceBought) * a.parameter1, 0)
                                                }
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
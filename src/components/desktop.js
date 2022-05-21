import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import { getUser } from "../services/auth";

class Desktop extends React.Component {

    state = {
        fetchedData : [],
        loading : true,
    }

	render(){
        var url = `https://crohe.herokuapp.com/api/transaction/list`
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
		return(
            <div className='layout-div desktop-page body-element'>
                <div className='desktop-header row'>
                    <div className='col-1' style={{display: `flex`,alignItems: `center`,}}>
                        <StaticImage
                            src='../images/icons/logo.png'
                            alt='Logo'
                        />
                    </div>
                    {/* <div className='col-10'>
                        <form className='search-field'>
                            <i>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                </svg>
                            </i>
                            <input type={`text`} placeholder="Поиск" /> 
                            
                        </form>
                    </div>
                    <div className='col-1'>
                        <button className='main-button'>
                            События
                        </button>
                    </div> */}
                </div>
                <div className='desktop-content'>
                    <div className='hello-user'>
                        <h1>{ getUser().firstName + " " + getUser().lastName }</h1>
                    </div>
                    <div className='default-container'>
                        <div className='flex-row'>
                            <div className='col-4 flex-row'>
                                <div className='col-6 card-outer'>
                                    <div className='card'>
                                        Первичный контакт
                                        <div className='card-content'>
                                            {this.state.fetchedData.length}
                                            <hr></hr>
                                            <p className='card-bottom-text'>
                                                за неделю
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 card-outer'>
                                    <div className='card'>
                                        Переговоры
                                        <div className='card-content'>
                                            {this.state.fetchedData.length}
                                            <hr></hr>
                                            <p className='card-bottom-text'>
                                                за неделю
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 card-outer'>
                                    <div className='card'>
                                        Принимают решение
                                        <div className='card-content'>
                                            {this.state.fetchedData.length}
                                            <hr></hr>
                                            <p className='card-bottom-text'>
                                                за неделю
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 card-outer'>
                                    <div className='card'>
                                        Согласование договора
                                        <div className='card-content'>
                                            {this.state.fetchedData.length}
                                            <hr></hr>
                                            <p className='card-bottom-text'>
                                                за неделю
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 card-outer'>
                                <div className='card'>
                                    Первичный контакт
                                    <div className='card-content'>
                                        {this.state.fetchedData.length}
                                        <div className='card-absolute-text'>
                                            {this.state.fetchedData.length}
                                            <p className='card-bottom-text'>
                                                за неделю
                                            </p>
                                        </div>
                                        <hr></hr>
                                        <div className='desktop-list'>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    Smith
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} задачи
                                                </p>
                                                <hr className='contact-line'></hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 card-outer'>
                                <div className='card'>
                                    Сделок по менеджерам
                                    <div className='card-content'>
                                        {this.state.fetchedData.length}
                                        <hr></hr>
                                        <div className='desktop-list'>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    Smith
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} сделок
                                                </p>
                                                <hr className='deal-line'></hr>
                                            </div>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    John
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} сделок
                                                </p>
                                                <hr className='deal-line'></hr>
                                            </div>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    Marat
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} сделок
                                                </p>
                                                <hr className='deal-line'></hr>
                                            </div>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    Smith
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} сделок
                                                </p>
                                                <hr className='deal-line'></hr>
                                            </div>
                                            <div className='desktop-list-item'>
                                                <p className='desktop-list-item-name'>
                                                    Smith
                                                </p>
                                                <p className='desktop-list-item-tasks'>
                                                    {this.state.fetchedData.length} сделок
                                                </p>
                                                <hr className='deal-line'></hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
};

export default Desktop;

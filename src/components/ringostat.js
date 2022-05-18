import React from 'react'

class RingoStat extends React.Component {    

    state = {
        fetchedData : []
    }

	componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Auth-key", "ahWrEDgck4jXGa0lA9qjCX8iMtPtKMMD");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.ringostat.net/calls/list?export_type=json&shy;&fields=calldate,caller,dst,call_type,disposition,billsec,recording", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
	}

	render(){
		const { fetchedData } = this.state;
        console.log(fetchedData)
		return(
            <div className='analytics-right-content'>
                <div className='content-title'>
                    RingoStat
                </div>
                <div className='calls-table'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Дата звонка</th>
                                <th>Клиент</th>
                                <th>Сотрудник</th>
                                <th>Тип звонка</th>
                                <th>Статус</th>
                            </tr>
                            {/* {
                                fetchedData.length > 0 && fetchedData.map((call, index) => {
                                    return <tr key={index}>
                                        <td>
                                            call.date
                                        </td>
                                    </tr>
                                })
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RingoStat
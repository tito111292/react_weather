import React from "react";
import Info from "./component/info"
import Form from "./component/form"
import Weather from "./component/weather"

const API_KEY="6f3063ca1071eae1b36dfa55e1412c97";

class App extends React.Component {

  state = {
    temp:undefined,
    city:undefined,
    country:undefined,
    pressure:undefined,
    sunset:undefined,
    error:undefined
  }
// Функция обработчик при клике на кнопку
  gettingWeather= async (e) => {
        // Останавливает перезагрузку страницы
        e.preventDefault();
        const city=e.target.elements.city.value;
          
          if(city){
          const api_url= await 
          fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
          const data= await api_url.json();

          var sunset=data.sys.sunset;
          var date= new Date();
          date.setTime(sunset);
          var sunset_date=date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
          
          this.setState({
               temp: data.main.temp,
               city: data.name,
               country:data.sys.country,
               pressure:data.main.pressure,
               sunset:sunset_date,
               error:''
          });
        }else{
          this.setState({
               temp: undefined,
               city: undefined,
               country:undefined,
               pressure:undefined,
               sunset:undefined,
               error:"Введите название города"
          });
        }
  }

      render(){
        return(
          <div className="wrapper">
             <div className="main">
             <div className="container">
                 <div className="row">
                      <div className="col-sm-5 info">
                            <Info />
                      </div>
                      <div className="col-sm-7 form">
                            <Form weatherMethod={this.gettingWeather}/>
                            <Weather 
                                temp={this.state.temp}
                                city={this.state.city}
                                country={this.state.country}
                                pressure={this.state.pressure}
                                sunset={this.state.sunset}
                                error={this.state.error}
                            />
                      </div>
                 </div>
                 </div>
             </div>
             
             
          </div>
          );
      }
}

export default App;
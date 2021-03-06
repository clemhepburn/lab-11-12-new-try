import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCat, removeCat } from '../utils/famous-cats-api';
import './CatPage.css';

export default class CatPage extends Component {

  state = {
    cat: {}
  }
  async componentDidMount() {
    try {
      this.setState({ cat: (await getCat(this.props.match.params.id)) });
    }
    catch (err) {
      console.log(err);
      this.props.history.push('/');
    }
  }

  onDelete = async e => {
    await removeCat(this.state.cat.id);
    this.props.history.push('/cats/');
  }
  
  render() {
    const cat = this.state.cat;

    return (
      <div className="CatPage">
        <div>
          <h2 className="page-title">{cat.name}</h2>
          <img src={cat.url} alt={cat.name}/>
          <div className="info">
            <label>type: <span>{cat.type}</span></label>
            <label>birth year: <span>{cat.year}</span></label>
            <label>lives left: <span>{cat.lives}</span></label>
            <label>is a sidekick?:<span>{(cat.isSidekick) ? 'Yes' : 'No'}</span></label>
          </div>
          <button onClick={this.onDelete}>Delete</button>
        </div>
        
        <Link to={`/cats/${cat.id}/edit`}><button>Edit</button></Link><Link to='/cats'>back</Link>
        
      </div>
    );
  }
}

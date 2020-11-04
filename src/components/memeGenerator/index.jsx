import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    fetch("http://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        const { memes } = res.data;
        console.log(memes)
        this.setState({ allMemeImgs: memes });
        // console.log(this.state.allMemeImgs[0]);
      });
  }
  handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target
    this.setState({ [name]: value})
    // console.log([name])
  }
  handleSubmit(e){
    e.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[randNum].url
    // console.log(randMemeImg)
    this.setState({ randomImg: randMemeImg})
  }


  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Top text"
            name="topText"
            value={this.state.topText}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button >Gen</button>
        </form>
        <div className="meme">
            <img src={this.state.randomImg} alt=""/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;

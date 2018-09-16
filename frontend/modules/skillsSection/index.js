import React, { Component } from 'react';
import CircularProgressBar from 'components/CircularProgressBar';
import LineProgressBar from 'components/LineProgressBar';
import Image from 'components/Image';

class SkillsSection extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            needToMount: false,
        }  

        this.handleScrollCalcualtion = this.handleScrollCalcualtion.bind(this);
        window.addEventListener("scroll", this.handleScrollCalcualtion);
        
 
    }

    handleScrollCalcualtion(event) {
        const skillScrollTop = document.querySelectorAll('[js-react-module="skillsSection"]')[0].offsetTop;
        const windowScrollTop = event.target.scrollingElement.scrollTop;
        if(windowScrollTop >= (skillScrollTop-500) && !this.state.needToMount) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    needToMount: true,
                }  
            });
        }
    }

    renderCircularSkills() {
        const {skillItems} = this.props;
        return Object.values(skillItems).slice(0, 4).map((item, key) => {

            const fadeStyle = {
                animationDuration: `${key/10}s`,
                animationDelay: `${key/5}s`,
            }

            if(item.title) {
                return(
                    <div className="col-xs-6 col-sm-6 marginBottom30 circular-bar-opacity" key={key} style={fadeStyle}>
                        <CircularProgressBar
                            percentage = {item.percentage}
                            strokeColor = {item.barbackground}
                            strokeValue = {key}
                        >
                            <div className="marginTop10 section--text-bold">
                                <p>{item.title}</p>
                            </div>
                        </CircularProgressBar>
                    </div>
                );
            } 
        });
    }

    renderLineSkills() {
        const {skillItems} = this.props;
        const skillsLength = Object.values(skillItems).length;
        return Object.values(skillItems).slice(4, skillsLength).map((item, key) => {

            const fadeStyle = {
                animationDuration: `${key/10}s`,
                animationDelay: `${key/5}s`,
            }

            if(item.title) {
                return(
                    <div className="col-sm-12 marginBottom30 circular-bar-opacity" key={key} style={fadeStyle}>
                        <LineProgressBar
                            percentage = {item.percentage}
                            strokeWidth="3" 
                            trailWidth="3" 
                            strokeColor={item.barbackground}
                            strokeLinecap="square"
                        >
                            <div className="section--text-bold" style={{'width': '100%'}}> 
                                <p style={{'float': 'left'}}>{item.title}</p> 
                                <p style={{'float': 'right'}}>{item.percentage}%</p>
                            </div>
                        </LineProgressBar>   
                    </div>
                );
            } 
        });
    }


    render() { 
        const {sectionTitle} = this.props;
        const {needToMount} = this.state;
        return ( 
            <section className="skills-section" id="skills">
                <div
                    smooth-parallax=""
                    start-movement="0.05"
                    end-movement="1"
                    start-position-x="-.2"
                    end-position-x=".1"
                    >
                    <h1 className="skills-header-parallax">{sectionTitle}</h1>
                </div>
                
                <div className="container paddingTop30 paddingBottom30">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            { needToMount && this.renderCircularSkills()}
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            {needToMount && this.renderLineSkills()}
                        </div>
                    </div>
                </div>
                
		    </section>  
         );
    }
}
 
export default SkillsSection;
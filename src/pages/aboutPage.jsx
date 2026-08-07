import React from 'react';
import './aboutPage.css'
import { Link } from 'react-router-dom';

export default function AboutPage() {
    
    return (
        <>
         <section className="about-section intro-panel">
            <div className='textBox'>
 <h1>About Gitspedia</h1>
            <p>Gitspedia is an answer to a simple question: <strong>What if creative studios had their own Wikipedia site?</strong><br></br>Speaking of which, there's also a Gitspedia article about this site! Check it out.....</p>
            <Link to="/articles/cmsbrqb8200006xvlrn9mqmmc">
                Read the Gitspedia article about this site
            </Link>
            <p><br></br>Or you can simply stick around and see what Gitspedia has to offer. That's cool too.</p>
            </div>
        </section>
        <section className="about-section made-with">
            <div className='textBox'>
                <h2>But what <i>is</i> Gitspedia?</h2>
                <p>Why should you care? What makes this site so interesting?<br></br>Well..Gitspedia is a website that solves an issue that <strong>many other creative studios fall into.</strong><br></br>You see, most other creative studios, when they publish a website, it seems....<i>barren.</i> Just general info about some of their work and an "About" page with standard corporate speak, that's it.<br></br><strong>But Gitspedia aims to break that mold.</strong></p>
            </div>
        </section>
        <section className="about-section wikipedia-example">
            <div className='textBox'>
                <h2>You've heard of Wikipedia, right?</h2>
                <p>The massive website with thousands if not millions of articles? The eleventh most visisted website? Well..obviously we can't reach those heights, but we can certainly try and adopt the online encyclopedia format, which is what we've done.</p>
            </div>
        </section>
        <section className="about-section features-parent">
            <div className='textBox'>
                <h2>But enough rambling. Let's talk features!</h2>
                <h4>Features of Gitspedia</h4>
                
  
            </div>
            <div className="features-list">
                    <div className="features-card">
                        <h3>Collaborative Editing</h3>
                        <p>What, you thought you couldn't contribute to our projects? No way! You can register to be an admin and start editing and proofreading articles whenever you want--provided you sign up and request to be an admin.</p>
                    </div>
                    <div className="features-card">
                        <h3>Easy To Use</h3>
                        <p>Gitspedia has an easy to use and easy to read interface, making reading simple---if you can navigate a website, you can navigate Gitspedia. Easy peasy!</p>
                    </div>
                    <div className="features-card">
                        <h3>Responsive Design</h3>
                        <p>Gitspedia is designed to be responsive across all devices--computer, tablet, mobile--even TV if that's how you read articles! No matter what device you're using, we've got you covered.</p>
                    </div>
                    <div className="features-card special-card">
                        <h3><i>Zero</i> Corporate Influence</h3>
                        <p>Crescent Moon Studio is a fully independent studio. No corporations influence our decisions, none at all! No investors are involved in our projects!</p>
                        <h6>To be honest, this is the most important aspect of our studio's philosophy--aside from being original, of course.</h6>
                    </div>
                    
                    </div>
            <div className="textBox">
                <h2>But most importantly....</h2>
            </div>
            <div className="features-list">
                <div className="features-card">
                    <h3>Filled To The Brim With Behind-The-Scenes Development Content</h3>
                    <p>If you like to read, then trust us, this website is for you. And if you like our studio's works, then this website is <i>doubly</i> for you! Gitspedia is <strong>filled with details about our projects, and the behind-the-scenes development processes that go into each and every single one of them.</strong></p>
                </div>
            </div>
        </section>
        <section className="about-section conclusion">
            <div className="textBox">
                <h2>So, our website's pretty cool, huh?</h2>
                <p>We hope it's as enjoyable for you to use as it was for us to create! You're going to have a blast reading all of the juicy details that go into our projects, every last one of them! Because at the end of the day, <strong>we make projects to make people happy. And that makes us happy.</strong></p>
            </div>
        </section>
        </>
       
    );
}
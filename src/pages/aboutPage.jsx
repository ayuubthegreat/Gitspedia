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
            <Link to="/articles">
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
                <div className="features-list">
                    <div className="features-card">
                        <h3>Collaborative Editing</h3>
                        <p>What, you thought you couldn't contribute to our projects? No way! You can register to be an admin and start editing and proofreading artic</p>
                    </div>
                    <div className="features-card">
                        <h3>Version Control</h3>
                        <p>Gitspedia keeps track of all changes made to articles, allowing contributors to view the history and revert to previous versions if needed.</p>
                    </div>
                    </div>
            </div>
        </section>
        </>
       
    );
}
import {Speech} from '../models/Speech';
import uuid from 'uuid/v4';

const DUMMY_SPEECH:Speech = {
    id: '59c29ac0-c5c7-44a2-909d-01c2ccc71dxx',
    title: 'Readme',
    content: '<h1 id=\"speech-repo-ui\">speech-repo-ui</h1>\n<p>A simple web application to create &amp; share a public speech and to view in other speeches(of course!).</p>\n<h3 id=\"see-it-live-https-speech-repos-web-app-\">See it LIVE! : <a href=\"https://speech-repos.web.app/\">https://speech-repos.web.app/</a></h3>\n<h3 id=\"technical-stack\">Technical Stack</h3>\n<ul>\n<li>Framework: <strong>React (with Typescript)</strong></li>\n<li>Deployment: <strong>Docker</strong></li>\n</ul>\n<h3 id=\"ci-cd\">CI/CD</h3>\n<ul>\n<li><p>[CI] All the commits are being tested for docker image build &amp; code level unit tests</p>\n<p>  Config file path: <code>.circleci/config.yml</code></p>\n<p>  Circle CI : <a href=\"https://circleci.com/gh/choudharyhimanshu/greytip-frontend-hiring-2020\">https://circleci.com/gh/choudharyhimanshu/greytip-frontend-hiring-2020</a></p>\n</li>\n<li><p>[CD] To be done!</p>\n</li>\n</ul>\n<h3 id=\"setup-guide\">Setup guide</h3>\n<h4 id=\"running-with-docker-locally\">Running with Docker locally</h4>\n<ol>\n<li>Start the service using <code>docker-compose-local.yml</code> file by running the below command at the project root</li>\n</ol>\n<pre><code>docker-compose -<span class=\"hljs-built_in\">file</span> docker-compose-<span class=\"hljs-keyword\">local</span>.yml up <span class=\"hljs-comment\">--build</span>\n</code></pre><ol>\n<li>Once the service is stated you can access it at <code>http://localhost:3000</code></li>\n</ol>\n<h4 id=\"running-with-node-recommended-\">Running with Node [Recommended]</h4>\n<ol>\n<li><p>Get Node &amp; npm installed in your system. Recommended versions are:</p>\n</li>\n<li><p>Node: ^10.x</p>\n</li>\n<li><p>npm: ^6.x</p>\n</li>\n<li><p>Download the dependencies using the command <code>npm install</code> at the project root</p>\n</li>\n<li><p>Now, start the application using the below command at the project root:</p>\n</li>\n<li><p><code>npm start</code></p>\n</li>\n</ol>\n',
    tags: ['readme', 'dummy', 'speech'],
    createdBy: 'Himanshu Choudhary',
    createdOn: new Date()
};

class SpeechService {

    private STORE_KEY = 'speechStorage';

    async createSpeech(speech: Speech): Promise<Speech> {
        return new Promise((resolve, error) => {
            const store = localStorage.getItem(this.STORE_KEY);
            let speeches: Speech[] = store ? JSON.parse(store) : [DUMMY_SPEECH];

            if (!speech.id) {
                speech.id = uuid();
            } else {
                const speechIndex = speeches.findIndex(s => s.id === speech.id);
                speeches.splice(speechIndex, 1);
            }

            speeches.push(speech);
            localStorage.setItem(this.STORE_KEY, JSON.stringify(speeches));

            setTimeout(() => resolve(speech), 1000);
        });
    }

    async getSpeeches(createdBy?: string): Promise<Speech[]> {
        return new Promise((resolve, error) => {
            const store = localStorage.getItem(this.STORE_KEY);
            let speeches: Speech[] = store ? JSON.parse(store) : [DUMMY_SPEECH];

            if (createdBy) {
                speeches = speeches.filter(speech => speech.createdBy === createdBy);
            }

            setTimeout(() => resolve(speeches), 1000);
        });
    }

    async getSpeechById(id: string): Promise<Speech> {
        return new Promise((resolve, error) => {
            const store = localStorage.getItem(this.STORE_KEY);
            const speeches: Speech[] = store ? JSON.parse(store) : [DUMMY_SPEECH];

            const speech = speeches.find(speech => speech.id === id);
            setTimeout(() => speech ? resolve(speech) : error(), 1000);
        });
    }

}

export default new SpeechService();

import * as React from 'react';
import {Redirect} from 'react-router';
import {toast} from 'react-toastify';
import {Breadcrumb, Button, Container, Form, Grid, Icon, Label, List, Message} from 'semantic-ui-react';

import {Speech} from '../../shared/models/Speech';
import {IGlobalContext, withGlobalContext} from '../../shared/contexts/global.context';

const DEFAULT_SPEECH: Speech = {
    id: '',
    title: '',
    tags: [...[]],
    createdOn: new Date(),
    createdBy: '',
};

export interface ICreateSpeechProps {
    globalContext: IGlobalContext;
}

export interface ICreateSpeechState  {
    speech: Speech;
    tagToAdd: string;
    errorsInForm: string[];
    isPublishing: boolean;
    publishedSpeechId?: string;
}

class CreateSpeech extends React.Component<ICreateSpeechProps, ICreateSpeechState> {

    constructor(props: ICreateSpeechProps) {
        super(props);

        const userInfo = props.globalContext.userInfo;

        const speech = {...DEFAULT_SPEECH};
        speech.tags = [...[]];
        speech.createdBy = userInfo ? userInfo.username : 'anonymous';

        this.state = {
            speech: speech,
            tagToAdd: '',
            errorsInForm: [],
            isPublishing: false
        };

        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleTagInput = this.handleTagInput.bind(this);
        this.handleTagAddition = this.handleTagAddition.bind(this);
        this.handleTagRemoval = this.handleTagRemoval.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleQuestionOptionAddition = this.handleQuestionOptionAddition.bind(this);
        this.handleQuestionOptionRemoval = this.handleQuestionOptionRemoval.bind(this);
        this.handleQuestionAdditionAction = this.handleQuestionAdditionAction.bind(this);
        this.handleQuestionRemovalAction = this.handleQuestionRemovalAction.bind(this);
        this.handleSpeechPublishAction = this.handleSpeechPublishAction.bind(this);
    }

    handleTitleInput(value: string) {
        this.setState(prevState => {
           const speech = prevState.speech;
           speech.title = value;
           return {speech: speech};
        });
    }

    handleTagInput(value: string) {
        this.setState({
           tagToAdd: value
        });
    }

    handleTagAddition(value: string) {
        if (value) {
            this.setState(prevState => {
                const speech = prevState.speech;
                speech.tags.push(value);
                return {
                    speech: speech,
                    tagToAdd: ''
                };
            });
        }
    }

    handleTagRemoval(index: number) {
        this.setState(prevState => {
            const speech = prevState.speech;
            speech.tags.splice(index, 1);
            return {speech: speech};
        });
    }

    handleQuestionTypeChange(questionIndex: number, value: string) {
        this.setState(prevState => {
            const speech = prevState.speech;
            return {speech: speech};
        });
    }

    handleQuestionTextChange(questionIndex: number, value: string) {
        this.setState(prevState => {
            const speech = prevState.speech;
            return {speech: speech};
        });
    }

    handleQuestionOptionAddition(questionIndex: number, value: string) {
        if (value) {
            this.setState(prevState => {
                const speech = prevState.speech;
                return {speech: speech};
            });
        }
    }

    handleQuestionOptionRemoval(questionIndex: number, optionIndex: number) {
        this.setState(prevState => {
            const speech = prevState.speech;
            return {speech: speech};
        });
    }

    handleQuestionAdditionAction() {
        this.setState(prevState => {
            const speech = prevState.speech;
            return {speech: speech};
        });
    }

    handleQuestionRemovalAction(index: number) {
        this.setState(prevState => {
            const speech = prevState.speech;
            return {speech: speech};
        });
    }

    handleSpeechPublishAction() {
        this.setState({
            isPublishing: true,
            errorsInForm: []
        }, () => {
            const {speech: speech, errorsInForm}= this.state;

            if (!speech.title) {
                errorsInForm.push('A title is required for the speech');
            }

            if (errorsInForm.length > 0) {
                this.setState({
                    isPublishing: false,
                    errorsInForm
                });
            } else {
                // TODO
            }
        });
    }

    render() {
        const {speech: speech, tagToAdd, errorsInForm, isPublishing, publishedSpeechId: publishedSpeechId} = this.state;

        return(
            <Container className='pt-10 pb-10'>
                {publishedSpeechId && <Redirect to={'view/' + publishedSpeechId}/>}
                <Grid padded>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={16} computer={10} largeScreen={10}>
                            <Breadcrumb icon='right angle' sections={[
                                { key: 'Home', content: 'Home', link: true },
                                { key: 'Create', content: 'Create a speech', active: true },
                            ]} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={16} computer={10} largeScreen={10}>
                            <div>
                                <Form.Field className='pb-3'>
                                    <div className='ui big fluid input'>
                                        <input className='pl-0 no-border-top no-border-right no-border-left no-border-radius'
                                               placeholder='Give a title to your speech..' value={speech.title}
                                               onChange={(event) => this.handleTitleInput(event.target.value)}/>
                                    </div>
                                </Form.Field>
                                <Form.Field className='pb-3'>
                                    <label><h4 className='pb-1'>Tags</h4></label>
                                    <div className='pb-1'>
                                        {
                                            speech.tags.map((tag, index) =>
                                                <Label key={index} size='large' className='mb-1'>{tag} <Icon onClick={() => this.handleTagRemoval(index)} name='delete'/></Label>)
                                        }
                                    </div>
                                    <Form.Input width={6} size='mini' action={{ icon: 'add', onClick: () => this.handleTagAddition(tagToAdd) }} placeholder='Add a tag'
                                        value={tagToAdd} onChange={(event) => this.handleTagInput(event.target.value)} />
                                </Form.Field>
                            </div>
                            {
                                errorsInForm.length > 0 &&
                                    <Message warning>
                                        <Message.Header>There are some serious issues with the form!</Message.Header>
                                        <List bulleted>
                                            {errorsInForm.map((message, index) => <List.Item key={index}>{message}</List.Item>)}
                                        </List>
                                    </Message>
                            }
                            <Button fluid basic primary size='large' loading={isPublishing}
                                    onClick={this.handleSpeechPublishAction}>Publish <Icon name='send' className='ml-1'/></Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

}

export default withGlobalContext(CreateSpeech);

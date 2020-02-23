import * as React from 'react';
import {Redirect} from 'react-router';
import {toast} from 'react-toastify';
import {Breadcrumb, Button, Container, Form, Grid, Icon, Label, List, Message} from 'semantic-ui-react';
import RichTextEditor, { EditorValue } from 'react-rte';

import {Speech} from '../../shared/models/Speech';
import {IGlobalContext, withGlobalContext} from '../../shared/contexts/global.context';
import speechService from '../../shared/services/speech.service';

const DEFAULT_SPEECH: Speech = {
    id: '',
    title: '',
    content: '',
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
    speechContent: EditorValue;
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
            isPublishing: false,
            speechContent: RichTextEditor.createEmptyValue()
        };

        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleTagInput = this.handleTagInput.bind(this);
        this.handleTagAddition = this.handleTagAddition.bind(this);
        this.handleTagRemoval = this.handleTagRemoval.bind(this);
        this.handleSpeechPublishAction = this.handleSpeechPublishAction.bind(this);
        this.handleSpeechContentChange = this.handleSpeechContentChange.bind(this);
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

    handleSpeechContentChange(value: EditorValue) {
        this.setState({
            speechContent: value
        });
    }

    handleSpeechPublishAction() {
        this.setState({
            isPublishing: true,
            errorsInForm: []
        }, () => {
            const {speech: speech, errorsInForm, speechContent}= this.state;

            if (!speech.title) {
                errorsInForm.push('A title is required for the speech');
            }

            if (speechContent) {
                speech.content = speechContent.toString('html');
            }

            if (errorsInForm.length > 0) {
                this.setState({
                    isPublishing: false,
                    errorsInForm
                });
            } else {
                speechService.createSpeech(speech).then(response => {
                    toast.success('Speech saved successfully!');
                    this.setState({isPublishing: false});
                }).catch(error => {
                    toast.error(error.toString());
                });
            }
        });
    }

    render() {
        const {speech, tagToAdd, errorsInForm, isPublishing, publishedSpeechId, speechContent} = this.state;

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
                                <Form.Field className='pb-3'>
                                    <div className='ui big fluid input'>
                                        <RichTextEditor className='w-full min-h-200px' placeholder='Give a title to your speech..'
                                            value={speechContent} onChange={this.handleSpeechContentChange}/>
                                    </div>
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

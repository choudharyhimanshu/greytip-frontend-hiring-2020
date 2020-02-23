import * as React from 'react';
import {Container, Grid, Header, Icon, Loader, Divider, Segment, Label} from 'semantic-ui-react';
import {IGlobalContext, withGlobalContext} from '../../shared/contexts/global.context';
import speechService from '../../shared/services/speech.service';
import { Speech } from '../../shared/models/Speech';
import { toast } from 'react-toastify';
import Moment from 'moment';

export interface IViewProps {
    globalContext: IGlobalContext;
    match: {params: {id : string}}
}

export interface IViewState {
    isLoading: boolean;
    speech?: Speech;
}

class ViewSpeech extends React.Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    fetchSpeech(id: string) {
        this.setState({isLoading: true, speech: undefined}, () => {
            speechService.getSpeechById(id).then(response => {
                this.setState({
                    isLoading: false,
                    speech: response
                });
            }).catch(error => {
                this.setState({
                    isLoading: false,
                });
            });
        });
    }

    componentDidMount() {
        this.fetchSpeech(this.props.match.params.id);
    }

    componentDidUpdate(prevProps: IViewProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchSpeech(this.props.match.params.id);
        }
    }

    render() {

        const {isLoading, speech} = this.state;

        if (isLoading) {
            return(
                <Container className='pt-10 pb-10'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Loader active inline='centered' className='mt-10'/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }

        if (!speech) {
            return(
                <Container className='pt-10 pb-10'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                            <Header as='h2' icon textAlign='center' className='mt-10'>
                                <Icon name={'warning circle'} />
                                OOPS!
                                <Header.Subheader>
                                    Requested speech not found. :(
                                </Header.Subheader>
                            </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }

        return(
            <Container className='pt-10 pb-10'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <h1>{speech.title}</h1>
                            <h3>Created on {Moment(speech.createdOn).format('DD MMM YYYY')} by {speech.createdBy}</h3>
                            {speech.tags.map(tag => <Label key={tag} size='big'>{tag}</Label>)}
                            <Segment piled>
                                <div dangerouslySetInnerHTML={{
                                    __html: speech.content
                                }} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

}

export default withGlobalContext(ViewSpeech);

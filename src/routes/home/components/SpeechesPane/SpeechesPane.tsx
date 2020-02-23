import * as React from 'react';
import {toast} from 'react-toastify';
import {Button, Grid, Header, Icon, Input, Loader} from 'semantic-ui-react';

import SpeechCard from '../SpeechCard/SpeechCard';
import {Speech} from '../../../../shared/models/Speech';
import {IGlobalContext, withGlobalContext} from '../../../../shared/contexts/global.context';
import speechService from '../../../../shared/services/speech.service';

export interface ISpeechesPaneProps {
    getMySpeeches: boolean;
    globalContext: IGlobalContext;
}

export interface ISpeechesPaneState {
    speeches?: Speech[];
    isLoading: boolean;
    filterQuery: string;
}

class SpeechesPane extends React.Component<ISpeechesPaneProps, ISpeechesPaneState> {

    private allSpeeches: Speech[] = [];

    constructor(props: ISpeechesPaneProps) {
        super(props);

        this.state = {
            isLoading: false,
            filterQuery: ''
        };

        this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this);
    }

    fetchSpeeches() {
        this.setState({isLoading: true}, () => {
            const username = this.props.globalContext.userInfo ? this.props.globalContext.userInfo.username : '';

            if (this.props.getMySpeeches && !username) {
                toast.error('User session not found.');
                this.setState({isLoading: false});
            } else {
                speechService.getSpeeches(this.props.getMySpeeches ? username : undefined).then(response => {
                    this.allSpeeches = response;
                    this.setState({
                        isLoading: false,
                        speeches: response
                    });
                }).catch(error => {
                    toast.error(error.toString());
                });
            }
        });
    }

    handleFilterQueryChange(value: string) {
        const filteredSpeeches = this.allSpeeches.filter(speech => {
            return (!value ||
                speech.title.toLowerCase().includes(value.toLowerCase()) ||
                speech.content.toLowerCase().includes(value.toLowerCase()) ||
                speech.createdBy.toLowerCase().includes(value.toLowerCase()) ||
                speech.tags.join(' ').toLowerCase().includes(value.toLowerCase())
            );
        });
        this.setState({
            filterQuery: value,
            speeches: filteredSpeeches
        });
    }

    componentDidMount() {
        this.fetchSpeeches();
    }

    componentWillReceiveProps(newProps: ISpeechesPaneProps) {
        if (newProps.getMySpeeches !== this.props.getMySpeeches) {
            this.fetchSpeeches();
        }
    }

    render() {
        const {isLoading, speeches: speeches, filterQuery} = this.state;

        return(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Input fluid size='small' icon='search' placeholder='Search...' value={filterQuery}
                               onChange={(event) => this.handleFilterQueryChange(event.target.value)}/>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign='right'>
                        <Button primary size='small' href='#/create'><Icon className='mr-1' name='add'/>Create New</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {   isLoading
                        ?   <Grid.Column><Loader active inline='centered' className='mt-5 mb-5' /></Grid.Column>
                        :   speeches
                            ?   speeches.length > 0
                                ?   speeches.map(speech =>
                                        <Grid.Column key={speech.id} mobile={16} tablet={8} computer={4} largeScreen={4} className='pb-3'>
                                            <SpeechCard speech={speech}/>
                                        </Grid.Column>
                                    )
                                :   <Grid.Column>
                                        <Header as='h4' className='pt-3 pb-3' textAlign='center'>
                                            <Header.Content><Icon name='warning' /> No results found.</Header.Content>
                                        </Header>
                                    </Grid.Column>
                            :   <Grid.Column>
                                    <Header as='h4' className='pt-3 pb-3' textAlign='center'>
                                        <Header.Content><Icon name='warning' /> Error occurred while fetching the speeches.</Header.Content>
                                    </Header>
                                </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
        );
    }
}

export default withGlobalContext(SpeechesPane);

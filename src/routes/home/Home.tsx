import * as React from 'react';
import {Container, Grid, Tab} from 'semantic-ui-react';
import {IGlobalContext, withGlobalContext} from '../../shared/contexts/global.context';
import SpeechesPane from './components/SpeechesPane/SpeechesPane';

export interface IHomeProps {
    globalContext: IGlobalContext;
}

const panes = [
    {
        menuItem: 'All Speeches',
        render: () => <SpeechesPane getMySpeeches={false}/>
    },
    {
        menuItem: 'My Speeches',
        render: () => <SpeechesPane getMySpeeches={true}/>
    }
];

class Home extends React.Component<IHomeProps, {}> {

    constructor(props: IHomeProps) {
        super(props);
    }

    render() {
        const {globalContext} = this.props;

        return(
            <Container className='pt-10'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

}

export default withGlobalContext(Home);

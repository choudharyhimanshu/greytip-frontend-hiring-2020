import * as React from 'react';
import Moment from 'moment';
import {Card, Icon, Label} from 'semantic-ui-react';

import {Speech} from '../../../../shared/models/Speech';
import { Link } from 'react-router-dom';

export interface ISpeechesCardProps {
    speech: Speech;
}

class SpeechCard extends React.Component<ISpeechesCardProps> {

    constructor(props: ISpeechesCardProps) {
        super(props);

    }

    render() {
        const {speech} = this.props;

        return(
            <Card link href={'#/view/' + speech.id} fluid>
                <Card.Content>
                    <Card.Header className='pb-2'>{speech.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Created on {Moment(speech.createdOn).format('DD MMM YYYY')} by <strong>{speech.createdBy}</strong>
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Description className='pl-2'>
                    {
                        speech.tags.map(tag =>
                            <Label key={tag} className='mb-1'>{tag}</Label>
                        )
                    }
                </Card.Description>
                <Card.Content extra>
                    <Link to={'edit/' + speech.id}>Edit</Link>
                </Card.Content>
            </Card>
        );
    }
}

export default SpeechCard;

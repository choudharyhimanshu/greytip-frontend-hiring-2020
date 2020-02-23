import * as React from 'react';
import Moment from 'moment';
import {Card, Icon, Label} from 'semantic-ui-react';

import {Speech} from '../../../../shared/models/Speech';

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
                    <Card.Header className='pb-1'>{speech.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Created on {Moment(speech.createdOn).format('DD MMM YYYY')} by <strong>{speech.createdBy}</strong>
                        </span>
                    </Card.Meta>
                    <Card.Description className='pt-1 pb-1'>
                        {
                            speech.tags.map(tag =>
                                <Label key={tag} className='mb-1'>{tag}</Label>
                            )
                        }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        <Icon name='list ol' />
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default SpeechCard;

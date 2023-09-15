import { Factory } from 'rosie'

Factory.define('service.user_database.record.user.1')
    .attr('_id', '62d62d6d74a19dac705ccaeb')
    .attr('first_name', 'Ricardo')
    .attr('last_name', 'Bishop')
    .attr('email_address', 'ricardo.bishop@gmail.com')
    .attr('password', 'password123')
    .attr('created_at', new Date())
    .attr('updated_at', new Date())

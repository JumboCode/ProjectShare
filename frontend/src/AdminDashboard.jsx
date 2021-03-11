import React from "react";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fetchData: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/posts')
            .then(response => response.json())
            .then(data => 
                this.setState({
                    fetchData: data,
                    isLoading: false,
                })
            )
            .catch(error => console.error('Error: Could not fetch data.'));
    }

    render() {
        const { isLoading, fetchData } = this.state
        if(!isLoading) {
            return (
                <Table striped bordered className="DataTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Tags</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchData.map((post,index) =>
                            <tr key={index}>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>{post.tags}</td>
                                <td>{post.category.name}</td>
                            </tr> 
                        )}
                    </tbody>
                </Table>
            );
        } else {
            return (
                <h3>Loading...</h3>
            );
        }
    }
}

export default Dashboard;
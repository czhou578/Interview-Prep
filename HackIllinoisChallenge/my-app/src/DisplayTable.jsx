import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Header, Table } from "semantic-ui-react";

export default function DisplayTable(props) {
  const { numRows } = props;
  const [fetchedRows, setFetchedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.hackillinois.org/profile/leaderboard/")
      .then((data) => {
        setFetchedRows(data.data.profiles);
      });
  }, []);

  return (
    <Container
      style={{
        height: "fit-content",
        width: "70%",
        marginTop: "30px",
        paddingBottom: "20px",
      }}
    >
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Position</Table.HeaderCell>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Discord</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {numRows && fetchedRows
            ? fetchedRows.map((element, index) => {
                if (index < numRows) {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Header as="h3" textAlign="center">
                          {index + 1}
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{element.id}</Table.Cell>
                      <Table.Cell>{element.discord}</Table.Cell>
                      <Table.Cell>{element.points}</Table.Cell>
                    </Table.Row>
                  );
                }
              })
            : fetchedRows.map((element, index) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h3" textAlign="center">
                        {index + 1}
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{element.id}</Table.Cell>
                    <Table.Cell>{element.discord}</Table.Cell>
                    <Table.Cell>{element.points}</Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../../Styles/global";
import { Form, Col, Button } from "react-bootstrap";

export const SignUpForm: React.FC = () => {
  const [years, setYears] = useState<number[]>([]);

  const yearData = () => {
    const years: number[] = [];
    for (var i = 2020; i > 1900; i--) {
      years.push(i);
    }
    setYears(years);
    console.log(years);
  };

  useEffect(() => {
    yearData();
  }, []);

  return (
    <Form
      style={{ maxWidth: "320px", paddingLeft: "25px", paddingTop: "10px" }}
      onSubmit={() => {}}
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formName">
          <Form.Control name="firstName" type="name" placeholder="First Name" />
        </Form.Group>
        <Form.Group as={Col} controlId=" formGridPassword">
          <Form.Control
            name="lastName"
            type="lastName"
            placeholder="Last Name"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control name="email" type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Control
            name="phoneNumber"
            type="tel"
            pattern="[0-9]*"
            placeholder="Number"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row as={Col}>
        <Form.Label>Birthday</Form.Label>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control name="month" as="select" defaultValue="Choose...">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>Auguest</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control name="day" as="select" defaultValue="Choose...">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name="year" as="select" defaultValue="Choose...">
            {years.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Button
        type="submit"
        style={{ backgroundColor: PRIMARY_COLOR, marginBottom: "10px" }}
      >
        Submit
      </Button>
    </Form>
  );
};

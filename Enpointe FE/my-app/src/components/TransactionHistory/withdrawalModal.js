import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import "./style.css";

const WithdrawModal = (props) => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(9); // Assume a balance of 9 Rs.
  const [error, setError] = useState("");

  const handleWithdrawal = () => {
    const withdrawalAmount = parseFloat(+amount);
    if (withdrawalAmount > balance) {
      setError("Insufficient balance");
    } else {
      setBalance(balance - withdrawalAmount);
      setError("");
      props.toggle();
    }
  };

  return (
    <div>
      {/* Modal */}
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Withdraw Funds</ModalHeader>
        <ModalBody>
          <p>Available Balance: {balance} Rs.</p>
          <FormGroup>
            <Label for="withdrawalAmount">Amount</Label>
            <Input
              type="number"
              id="withdrawalAmount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleWithdrawal}>
            Withdrawal
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Close
          </Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WithdrawModal;

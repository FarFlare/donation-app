pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DonateToken is ERC20{
    constructor() ERC20("Donate", "DNT") {
        _mint(msg.sender, 1000000);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
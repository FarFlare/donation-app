pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Distributor {
    address private _owner;
    address private _oracle;  // Should be linked to the off-chain backend account
    uint private _key = 0;
    mapping(uint => address) _donations;  // Link id => owner
    mapping(string => mapping(address => uint)) _unclaimed_pools;  // username => token => value
    mapping(string => address) _pool_to_address;  // username => owner
    mapping(address => string) _address_to_pool;  // username => owner

    event unclaimedPullDonation(string to, uint amount);

    constructor() {
        _owner = msg.sender;
    }

    function setOracle(address oracle_) public {  // Set off-chain oracle
        require(msg.sender == _owner);
        _oracle = oracle_;
    }

    function getOracle() public view returns (address) {  // Get off-chain oracle
        require(msg.sender == _owner);
        return _oracle;
    }

    function newLink(address donate_to_) public returns (uint){  // Generating a new id for the donation link
        _key += 1;
        _donations[_key] = donate_to_;
        return _key;
    }

    function donateErc20(uint key_, address token_, uint value_) public {  // Allowing users to donate
        require(key_ <= _key);
        _getAllowance(token_, value_);
        ERC20 donation = ERC20(token_);
        donation.transferFrom(msg.sender, _donations[key_], value_);  // Include commissions?
    }

    function donateToPoolErc20(string memory network_user_, address token_, uint value_) public {  // Donate to unregistered users
        // Format on network_user: "twitter:k0rean_rand0m"
        _getAllowance(token_, value_);
        ERC20 donation = ERC20(token_);
        if (_pool_to_address[network_user_] == address(0)) {
            donation.transferFrom(msg.sender, address(this), value_);
            _unclaimed_pools[network_user_][token_] += value_;
            emit unclaimedPullDonation(network_user_, value_);
        } else {
            donation.transferFrom(msg.sender, _pool_to_address[network_user_], value_);
        }
    }

    function signup(string memory network_user_, address bind_) public {  // Allows to Oracle to link social account to address
        require(msg.sender == _oracle, "You can't perform this action!");
        _pool_to_address[network_user_] = bind_;
        _address_to_pool[bind_] = network_user_;
    }

    function claimPool(address token_) public {  // Allows to claim pool, when unregistered user links his/her account
        require(keccak256(abi.encodePacked(_address_to_pool[msg.sender])) != keccak256(abi.encodePacked(""))); // ToDo nice/nah?
        ERC20 donation = ERC20(token_);
        donation.transfer(msg.sender, _unclaimed_pools[_address_to_pool[msg.sender]][token_]);
    }

    function getPool(address token_) public view returns (uint) {  // Returns pool value for account if exists
        if (keccak256(abi.encodePacked(_address_to_pool[msg.sender])) != keccak256(abi.encodePacked(""))) {  // ToDo nice/nah?
            return _unclaimed_pools[_address_to_pool[msg.sender]][token_];
        } else {
            return 0;
        }
    }

    function _getAllowance(address token_, uint value_) private {
        ERC20 donation = ERC20(token_);
        if (donation.allowance(address(this), msg.sender) < value_){
            donation.increaseAllowance(msg.sender, value_);
        }
    }

}

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Distributor {
    address private _owner;
    address private _oracle;
    uint private _key = 0;
    mapping(uint => address) _donations;  // Link id => owner
    mapping(string => mapping(address => uint)) _unclaimed_pools;  // username => token => value
    mapping(string => address) _pool_to_address;  // username => owner
    mapping(address => string) _address_to_pool;  // username => owner

    event unclaimedPullDonation(string to, uint amount);

    constructor() {
        _owner = msg.origin;
    }

    function setOracle(address oracle_) public {
        require(msg.sender == _owner);
        _oracle = oracle_;
    }

    function getOracle() public view returns (address) {
        require(msg.sender == _owner);
        return oracle_;
    }

    function newLink(address donate_to_) public returns (uint){
        key += 1;
        _donations[key] = donate_to_;
        return key;
    }

    function donateErc20(uint key_, ERC20 token_, uint value_) public {
        require(key_ <= _key);
        _getAllowance(token_, value_);
        token_.transferFrom(msg.sender, _donations[key_], value_);  // Include commissions?
    }

    function donateToPoolErc20(string network_user_, ERC20 token_, uint value_) public {  // network_user = "twitter:k0rean_rand0m"
        _getAllowance(token_, value_);
        if (_pool_to_address[network_user_] = address(0)) {
            token_.transferFrom(msg.sender, this, value_);
            _unclaimed_pools[network_user_][token_] += value_;
            emit unclaimedPullDonation(network_user_, value_);
        } else {
            token_.transferFrom(msg.sender, _pool_to_address[network_user_], value_);
        }
    }

    function claimPool(ERC20 token_, uint value_) public {
        require(_address_to_pool[msg.sender] != ""); // ToDo Check!
        token_.transfer(msg.sender, _unclaimed_pools[_address_to_pool[msg.sender]][token_]);
    }

    function getPool(ERC20 token_) public view returns (uint) {
        if (_address_to_pool[msg.sender] != "") {
            return _unclaimed_pools[_address_to_pool[msg.sender]][token_];
        } else {
            return 0;
        }
    }
    
    function signup(string network_user_, address bind_) public {
        require(msg.sender == _oracle, "You can't perform this action!");
        _pool_to_address[network_user_] = bind_;
        _address_to_pool[bind_] = network_user_;
    }

    function _getAllowance(ERC20 token_, uint value_) private {
        if (token_.allowance(this, msg.sender) < value_){
            token_.increaseAllowance(msg.sender, value_);
        }
    }

}

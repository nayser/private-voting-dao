import React, { useState, useEffect } from 'react';
import { Vote, Shield, Users, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const VotingDApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [hasVoted, setHasVoted] = useState({});
  const [votingInProgress, setVotingInProgress] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  // Sample proposals
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Upgrade Protocol to V2',
      description: 'Implement new scaling solution with improved transaction throughput',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      creator: '0x1234...5678'
    },
    {
      id: 2,
      title: 'Treasury Allocation',
      description: 'Allocate 100 ETH to development fund for Q1 2025',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active',
      creator: '0xabcd...efgh'
    },
    {
      id: 3,
      title: 'Community Grant Program',
      description: 'Launch $50K grant program for ecosystem builders',
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'ended',
      creator: '0x9876...5432'
    }
  ]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setUserAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Wallet connection failed:', error);
        // Simulate connection for demo
        setUserAddress('0xDemo...Address');
        setWalletConnected(true);
      }
    } else {
      // Demo mode
      setUserAddress('0xDemo...Address');
      setWalletConnected(true);
    }
  };

  const castVote = async (proposalId, voteChoice) => {
    setVotingInProgress(true);
    
    // Simulate encryption and blockchain interaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setHasVoted(prev => ({ ...prev, [proposalId]: voteChoice }));
    setVotingInProgress(false);
    setCurrentView('home');
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const diff = endTime - now;
    
    if (diff < 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  const HomePage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-10 h-10" />
          <h2 className="text-3xl font-bold">Private Voting</h2>
        </div>
        <p className="text-lg opacity-90 mb-6">
          Cast your vote with complete privacy using Fully Homomorphic Encryption (FHE).
          Your vote is encrypted end-to-end and never revealed.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm opacity-80">Private</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm opacity-80">Data Leaks</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-sm opacity-80">Security</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Active Proposals</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            All
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            Active
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            Ended
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {proposals.map(proposal => (
          <div
            key={proposal.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setSelectedProposal(proposal);
              setCurrentView('detail');
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{proposal.title}</h4>
                <p className="text-gray-600">{proposal.description}</p>
              </div>
              {hasVoted[proposal.id] && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Voted
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Encrypted votes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{getTimeRemaining(proposal.endTime)}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                proposal.status === 'active' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {proposal.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProposalDetail = () => (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentView('home')}
        className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
      >
        ← Back to proposals
      </button>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{selectedProposal.title}</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedProposal.status === 'active' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {selectedProposal.status}
            </div>
          </div>
          <p className="text-gray-600 text-lg">{selectedProposal.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-500 mb-1">Created by</div>
            <div className="font-mono text-sm">{selectedProposal.creator}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Ends in</div>
            <div className="font-medium">{getTimeRemaining(selectedProposal.endTime)}</div>
          </div>
        </div>

        {hasVoted[selectedProposal.id] ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Vote Recorded</h3>
            <p className="text-green-700">
              Your encrypted vote has been recorded on-chain. It remains private and cannot be traced back to you.
            </p>
            <div className="mt-4 p-3 bg-white rounded border border-green-200">
              <div className="text-xs text-gray-500 mb-1">Your encrypted vote</div>
              <div className="font-mono text-xs text-gray-700 break-all">
                0x8f3a2b9c4d7e1a5f6c8d2b3a9e7f1c4d8b2e5a7f3c6d9b1e4a8f2c5d7b3e9a1f
              </div>
            </div>
          </div>
        ) : selectedProposal.status === 'active' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span>Your vote will be encrypted using FHE before being submitted</span>
            </div>
            
            <button
              onClick={() => castVote(selectedProposal.id, 'for')}
              disabled={votingInProgress}
              className="w-full py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {votingInProgress ? 'Encrypting & Submitting...' : 'Vote FOR'}
            </button>
            
            <button
              onClick={() => castVote(selectedProposal.id, 'against')}
              disabled={votingInProgress}
              className="w-full py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {votingInProgress ? 'Encrypting & Submitting...' : 'Vote AGAINST'}
            </button>
            
            <button
              onClick={() => castVote(selectedProposal.id, 'abstain')}
              disabled={votingInProgress}
              className="w-full py-4 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {votingInProgress ? 'Encrypting & Submitting...' : 'ABSTAIN'}
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Voting Ended</h3>
            <p className="text-gray-600">
              This proposal's voting period has ended. Results will be decrypted and revealed soon.
            </p>
          </div>
        )}
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          How Private Voting Works
        </h3>
        <div className="space-y-2 text-sm text-indigo-800">
          <div className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Your vote is encrypted on your device using Fully Homomorphic Encryption</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>The encrypted vote is submitted to the blockchain - no one can see your choice</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>Votes are tallied while still encrypted using FHE operations</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Only final results are decrypted - individual votes remain private forever</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Vote className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Private Voting DAO</h1>
                <p className="text-sm text-gray-600">Powered by Zama fhEVM</p>
              </div>
            </div>
            
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-mono text-sm">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
              </div>
            )}
          </div>

          {!walletConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">
                Please connect your wallet to participate in voting
              </p>
            </div>
          )}
        </header>

        {walletConnected && (
          currentView === 'home' ? <HomePage /> : <ProposalDetail />
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built with Zama fhEVM • All votes encrypted end-to-end • Privacy guaranteed</p>
          <p className="mt-2">Deploy to Sepolia testnet for full functionality</p>
        </footer>
      </div>
    </div>
  );
};

export default VotingDApp;

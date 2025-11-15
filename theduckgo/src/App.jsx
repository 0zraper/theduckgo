import React, { useState } from 'react';
import { Play, Calendar, TrendingUp, MessageSquare, Search, Bell, User, ThumbsUp, Youtube, Clock, Pin, Megaphone, HelpCircle, MessageCircle, X } from 'lucide-react';

export default function TheDuckGo() {
  const [votes, setVotes] = useState({
    1: 2847,
    2: 2653,
    3: 2401,
    4: 2198,
    5: 1956,
    6: 1823
  });
  
  const [hasVoted, setHasVoted] = useState(false);
  const [activeBoard, setActiveBoard] = useState('all');
  const [showVoteStats, setShowVoteStats] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // TOP 6 아이돌 (투표 가능)
  const topIdols = [
    { id: 1, name: 'NewJeans', initial: 'NJ', color: 'from-blue-400 to-purple-400', textColor: 'text-white' },
    { id: 2, name: 'aespa', initial: 'æ', color: 'from-purple-400 to-pink-400', textColor: 'text-white' },
    { id: 3, name: 'IVE', initial: 'IVE', color: 'from-pink-400 to-rose-400', textColor: 'text-white' },
    { id: 4, name: 'LE SSERAFIM', initial: 'LE', color: 'from-rose-400 to-orange-400', textColor: 'text-white' },
    { id: 5, name: 'SEVENTEEN', initial: '17', color: 'from-orange-400 to-yellow-400', textColor: 'text-white' },
    { id: 6, name: 'Stray Kids', initial: 'SKZ', color: 'from-yellow-400 to-red-400', textColor: 'text-white' }
  ];

  // 총 투표 수 계산
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  // 투표 비율 계산
  const getVotePercentage = (idolId) => {
    return ((votes[idolId] / totalVotes) * 100).toFixed(1);
  };

  // 실시간 순위별로 정렬된 아이돌 목록
  const sortedIdols = [...topIdols].sort((a, b) => votes[b.id] - votes[a.id]);

  // 각 아이돌의 현재 순위 찾기
  const getRank = (idolId) => {
    return sortedIdols.findIndex(idol => idol.id === idolId) + 1;
  };

  // 순위 변동 표시
  const getRankChange = (idol, currentRank) => {
    const originalRank = topIdols.findIndex(i => i.id === idol.id) + 1;
    const change = originalRank - currentRank;
    if (change > 0) return { symbol: '▲', color: 'text-red-500', change };
    if (change < 0) return { symbol: '▼', color: 'text-blue-500', change: Math.abs(change) };
    return { symbol: '─', color: 'text-gray-400', change: 0 };
  };

  // 아이돌 영상 (커버, 예능, 브이로그 등) - 실제 유튜브 영상
  const idolVideos = [
    { id: 1, title: 'NewJeans (뉴진스) \'ETA\' Official MV', channel: 'HYBE LABELS', views: '120M', time: '03:26', videoId: 'Qn_EE_F628M', thumb: '🐰' },
    { id: 2, title: 'aespa 에스파 \'Supernova\' MV', channel: 'SMTOWN', views: '89M', time: '03:36', videoId: 'phuiiNCxRMg', thumb: '🎭' },
    { id: 3, title: 'IVE (아이브) \'LOVE DIVE\' MV', channel: 'Starship TV', views: '250M', time: '02:58', videoId: 'Y8JFxS1HlDo', thumb: '👑' },
    { id: 4, title: 'LE SSERAFIM \'ANTIFRAGILE\' MV', channel: 'HYBE LABELS', views: '180M', time: '03:27', videoId: 'pyf8cbqyfPs', thumb: '✨' },
  ];

  // 공식 뮤직비디오 - 실제 유튜브 영상
  const musicVideos = [
    { id: 1, title: 'NewJeans (뉴진스) \'Super Shy\' Official MV', artist: 'NewJeans', views: '200M', time: '02:59', date: '7 months ago', videoId: 'ArmDp-zijuc', thumb: '🐰' },
    { id: 2, title: 'aespa 에스파 \'Drama\' MV', artist: 'aespa', views: '125M', time: '03:25', date: '5 months ago', videoId: 'D8VEhcPeSlc', thumb: '🎭' },
    { id: 3, title: 'IVE 아이브 \'I AM\' MV', artist: 'IVE', views: '98M', time: '03:28', date: '9 months ago', videoId: 'F0B7HDiY-10', thumb: '👑' },
    { id: 4, title: 'LE SSERAFIM \'Perfect Night\' MV', artist: 'LE SSERAFIM', views: '75M', time: '03:08', date: '4 months ago', videoId: 'r31DA3h_Ko8', thumb: '✨' },
  ];

  // 스케줄
  const schedules = [
    { date: '11.15 (금)', time: '18:00', event: 'NewJeans 컴백쇼', location: 'JTBC 스튜디오', type: 'broadcast' },
    { date: '11.16 (토)', time: '14:00', event: 'aespa 팬사인회', location: '코엑스 홀 C', type: 'fansign' },
    { date: '11.17 (일)', time: '19:00', event: 'IVE 콘서트', location: '고척 스카이돔', type: 'concert' },
    { date: '11.18 (월)', time: '20:00', event: 'LE SSERAFIM 무대', location: 'M Countdown', type: 'broadcast' },
    { date: '11.19 (화)', time: '15:00', event: 'SEVENTEEN 하이터치', location: '잠실 롯데월드', type: 'fansign' },
    { date: '11.20 (수)', time: '18:30', event: 'NewJeans 라디오', location: 'KBS 쿨FM', type: 'broadcast' },
  ];

  // 게시판
  const boardCategories = [
    { id: 'all', name: '전체', icon: MessageSquare, color: 'purple' },
    { id: 'notice', name: '공지', icon: Megaphone, color: 'red' },
    { id: 'news', name: '소식', icon: Pin, color: 'blue' },
    { id: 'request', name: '요청', icon: MessageCircle, color: 'green' },
    { id: 'free', name: '자유', icon: MessageSquare, color: 'yellow' },
    { id: 'qna', name: '질문답변', icon: HelpCircle, color: 'pink' },
  ];

  const boardPosts = [
    { id: 1, category: 'notice', title: '[공지] MAMA Awards 2024 투표 안내', author: '관리자', comments: 45, views: 1234, date: '11.14', time: '10:30' },
    { id: 2, category: 'news', title: 'NewJeans 새 앨범 발매 확정!', author: '뉴진스팬', comments: 156, views: 2341, date: '11.14', time: '09:15' },
    { id: 3, category: 'request', title: 'aespa 무대 직캠 모음 만들어주세요', author: 'MY', comments: 23, views: 567, date: '11.13', time: '22:45' },
    { id: 4, category: 'free', title: '어제 콘서트 다녀왔는데 진짜 최고였어요', author: 'DIVE', comments: 89, views: 1890, date: '11.13', time: '21:20' },
    { id: 5, category: 'qna', title: '팬싸인회 신청 방법 알려주세요', author: '초보팬', comments: 34, views: 890, date: '11.13', time: '18:30' },
    { id: 6, category: 'news', title: 'IVE 일본 투어 일정 공개', author: '아이브러버', comments: 67, views: 1567, date: '11.12', time: '16:40' },
    { id: 7, category: 'free', title: '12월 컴백 예정 아이돌 정리', author: 'KPOP덕후', comments: 234, views: 3456, date: '11.12', time: '15:20' },
    { id: 8, category: 'request', title: 'LE SSERAFIM 과거 무대 영상 찾아요', author: 'FEARNOT', comments: 12, views: 456, date: '11.11', time: '20:10' },
  ];

  const handleVote = (idolId) => {
    if (!hasVoted) {
      setVotes(prev => ({
        ...prev,
        [idolId]: prev[idolId] + 1
      }));
      setHasVoted(true);
      // 투표 후 자동으로 투표 현황 표시
      setTimeout(() => {
        setShowVoteStats(true);
      }, 500);
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'broadcast': return 'bg-red-100 text-red-700';
      case 'concert': return 'bg-purple-100 text-purple-700';
      case 'fansign': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    const cat = boardCategories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                The Duck Go 🦆
              </h1>
              <p className="text-xs text-gray-600 mt-0.5">모든 덕들을 위한 K-POP 포털 | 덕중의 덕, 더욱 더 깊은 덕질</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 덕의 정의 배너 */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Of the Deok, By the Deok, For the Deok
            </h2>
            <p className="text-xs text-gray-600 mt-1">덕의, 덕에 의한, 덕을 위한 포털</p>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <div>
                <span className="font-bold text-purple-600">덕(Deok)</span>
                <span className="text-gray-600 ml-2">= 어떤 대상에 깊이 빠져 열정적으로 좋아하는 사람</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-purple-200"></div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-2xl">🦆</span>
              <div>
                <span className="font-bold text-blue-600">오리들</span>
                <span className="text-gray-600 ml-2">= 더덕고 포털의 소중한 식구들</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 6 인기 투표 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 mr-2" />
              🔥 실시간 인기 TOP 6 - 오리님들의 최애에게 투표하세요!
            </h2>
            <p className="text-white text-sm opacity-90">진정한 덕후라면 반드시! 더욱 더 뜨겁게 응원하기 🎉</p>
            <button
              onClick={() => setShowVoteStats(!showVoteStats)}
              className="mt-3 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg text-sm font-medium transition-all"
            >
              {showVoteStats ? '📊 투표 현황 숨기기' : '📊 투표 현황 보기'}
            </button>
          </div>

          {/* 투표 현황 바 그래프 */}
          {showVoteStats && (
            <div className="bg-white bg-opacity-95 rounded-xl p-6 mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                📊 실시간 투표 현황 (총 {totalVotes.toLocaleString()}표)
              </h3>
              <div className="space-y-4">
                {sortedIdols.map((idol, index) => {
                  const percentage = getVotePercentage(idol.id);
                  const currentRank = index + 1;
                  const rankChange = getRankChange(idol, currentRank);
                  return (
                    <div key={idol.id} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            currentRank === 1 ? 'bg-yellow-100 text-yellow-600' :
                            currentRank === 2 ? 'bg-gray-100 text-gray-600' :
                            currentRank === 3 ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-50 text-gray-500'
                          }`}>
                            {currentRank}
                          </div>
                          <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${idol.color} flex items-center justify-center text-sm font-bold ${idol.textColor}`}>
                            {idol.initial}
                          </span>
                          <span className="font-bold text-gray-800">{idol.name}</span>
                          {rankChange.change > 0 && (
                            <span className={`text-sm font-bold ${rankChange.color}`}>
                              {rankChange.symbol}{rankChange.change}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-purple-600 text-lg">{percentage}%</span>
                          <span className="text-gray-600 text-sm ml-2">({votes[idol.id].toLocaleString()}표)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${idol.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                          style={{ width: `${percentage}%` }}
                        >
                          {parseFloat(percentage) > 10 && (
                            <span className="text-white text-xs font-bold">{percentage}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  💡 투표수에 따라 실시간으로 순위가 변경됩니다
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {sortedIdols.map((idol, index) => {
              const currentRank = index + 1;
              const rankChange = getRankChange(idol, currentRank);
              return (
                <div key={idol.id} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${idol.color} flex items-center justify-center text-2xl font-bold ${idol.textColor} mb-3 shadow-md relative`}>
                      {idol.initial}
                      {/* 순위 변동 배지 */}
                      {rankChange.change > 0 && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md">
                          <span className={`text-xs font-bold ${rankChange.color}`}>
                            {rankChange.symbol}{rankChange.change}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`text-3xl font-bold ${
                        currentRank === 1 ? 'text-yellow-500' : 
                        currentRank === 2 ? 'text-gray-400' : 
                        currentRank === 3 ? 'text-orange-600' : 
                        'text-gray-600'
                      }`}>
                        #{currentRank}
                      </div>
                      {rankChange.change !== 0 && (
                        <span className={`text-lg font-bold ${rankChange.color}`}>
                          {rankChange.symbol}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{idol.name}</h3>
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-purple-600">{votes[idol.id].toLocaleString()}</div>
                      <div className="text-sm text-gray-600">({getVotePercentage(idol.id)}%)</div>
                    </div>
                    <button
                      onClick={() => handleVote(idol.id)}
                      disabled={hasVoted}
                      className={`w-full py-2 rounded-lg font-medium transition-all ${
                        hasVoted 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4 inline mr-1" />
                      {hasVoted ? '투표완료' : '덕심 투표'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {hasVoted && (
            <p className="text-center text-white mt-4 text-sm">✅ 오리님의 뜨거운 덕심에 감사합니다! 🦆 (1일 1회 투표 가능)</p>
          )}
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* 왼쪽: K팝 아이돌 영상 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Youtube className="w-6 h-6 mr-2 text-red-600" />
              K팝 아이돌 영상 모음
            </h2>
            <p className="text-sm text-gray-600 mb-4">📹 덕질을 더하는 필수 영상! 예능·브이로그·비하인드</p>
            
            <div className="space-y-3">
              {idolVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                  onClick={() => setSelectedVideo(video.videoId)}
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-40 h-24 rounded-lg object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      {video.time}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 공식 뮤직비디오 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Play className="w-6 h-6 mr-2 text-purple-600" />
              공식 뮤직비디오
            </h2>
            <p className="text-sm text-gray-600 mb-4">🎵 덕후들의 필수 플레이리스트! 최신 MV</p>
            
            <div className="space-y-3">
              {musicVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                  onClick={() => setSelectedVideo(video.videoId)}
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-40 h-24 rounded-lg object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      {video.time}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{video.artist}</p>
                    <p className="text-xs text-gray-500 mt-1">{video.views} views · {video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단: 스케줄 & 게시판 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 스케줄 (1/3) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              이번주 스케줄
            </h2>
            <p className="text-sm text-gray-600 mb-4">📅 덕후라면 놓치면 안될 일정! 덕질 달력</p>
            
            <div className="space-y-3">
              {schedules.map((schedule, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-3 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-purple-600">{schedule.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(schedule.type)}`}>
                      {schedule.type === 'broadcast' ? '방송' : schedule.type === 'concert' ? '공연' : '팬사인'}
                    </span>
                  </div>
                  <p className="font-medium text-gray-800 text-sm">{schedule.event}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {schedule.time} · {schedule.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 게시판 (2/3) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-green-600" />
                  커뮤니티 게시판
                </h2>
                <p className="text-sm text-gray-600 mt-1">💬 오리들의 소통 연못! 함께 덕질해요 🦆</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                글쓰기
              </button>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-200">
              {boardCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveBoard(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center ${
                      activeBoard === category.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-2">
              {boardPosts
                .filter(post => activeBoard === 'all' || post.category === activeBoard)
                .map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-${getCategoryColor(post.category)}-100 text-${getCategoryColor(post.category)}-700 font-medium`}>
                          {boardCategories.find(c => c.id === post.category)?.name}
                        </span>
                        {post.category === 'notice' && <Pin className="w-3 h-3 text-red-500" />}
                      </div>
                      <h3 className="font-medium text-gray-800 hover:text-purple-600 transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>조회 {post.views}</span>
                        <span>{post.date} {post.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <span className="text-sm text-purple-600 font-medium whitespace-nowrap">
                        💬 {post.comments}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 유튜브 영상 모달 */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                The Duck Go 🦆
              </h3>
              <p className="text-sm text-gray-600 mb-2">모든 덕들을 위한 K-POP 포털</p>
              <p className="text-xs text-purple-600 font-medium mb-1">Of the Deok, By the Deok, For the Deok</p>
              <p className="text-xs text-gray-500">더욱 더 깊게, 진정한 덕질을 시작하세요!</p>
              <p className="text-xs text-purple-600 mt-2 font-medium">오리님들의 덕심을 더하다 🦆💜</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">바로가기</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="hover:text-purple-600 cursor-pointer">뮤직비디오</p>
                <p className="hover:text-purple-600 cursor-pointer">아이돌 스케줄</p>
                <p className="hover:text-purple-600 cursor-pointer">커뮤니티</p>
                <p className="hover:text-purple-600 cursor-pointer">인기 투표</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">문의</h4>
              <p className="text-sm text-gray-600">info@theduckgo.com</p>
              <p className="text-xs text-gray-500 mt-4">© 2024 The Duck Go. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Made with 💜 by 오리들 for 덕후들</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
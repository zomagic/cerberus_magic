/*
The MIT License (MIT)

Copyright (c) 2019 Zolkefli Mohamad (magic)

Permission is hereby granted, free of charge, To any person obtaining a copy
of this software And associated documentation files (the "Software"), To deal
in the Software without restriction, including without limitation the rights
To use, copy, modify, merge, publish, distribute, sublicense, and/Or sell
copies of the Software, And To permit persons To whom the Software is
furnished To do so, subject To the following conditions:

The above copyright notice And this permission notice shall be included in
all copies Or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT Not LIMITED To THE WARRANTIES OF MERCHANTABILITY,
FITNESS For A PARTICULAR PURPOSE And NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS Or COPYRIGHT HOLDERS BE LIABLE For ANY CLAIM, DAMAGES Or OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT Or OTHERWISE, ARISING FROM,
OUT OF Or IN CONNECTION WITH THE SOFTWARE Or THE USE Or OTHER DEALINGS IN
THE SOFTWARE.
*/

function Magicvideo(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.gc=this.canvas.getContext( '2d' );
	var video = document.createElement("video"); 
	this.videoContainer={
		video : video,
		ready : false,
		videoPause : 0,
		videoToPlay : 0,
		videoCurTime : 0,
		videoCurRate : 0,
		videoVolume : 0,
		videoLoop : 0,
	};
}

Magicvideo.prototype.Init=function(path,id){

	var video = document.createElement("video"); 
	var game=this.game;
	video.src=game.PathToUrl(path);
	video.autoPlay = false;
	video.loop = false;
	video.muted = true;
	//video.controls = true;
	//video.type="video/mp4";
	var videoContainer=this.videoContainer;
	videoContainer.video=video;
	video.onerror = function(e){
		console.log("There is a problem loading the video");
		console.log(e);
 	}
	video.oncanplay = readyToPlayVideo; 
	function readyToPlayVideo(event){ 
		videoContainer.ready = true;
		if (videoContainer.videoCurTime!=0){
			video.currentTime=parseFloat((videoContainer.videoCurTime+1)/1000.0);
			videoContainer.videoCurTime=0;
		}
		if (videoContainer.videoCurTime!=0){
			video.playbackRate=parseFloat(videoContainer.videoCurTime);
			videoContainer.videoCurTime=0;
		}
		if (videoContainer.videoCurTime!=0){
			video.muted = false;
			video.volume=parseFloat(videoContainer.videoCurTime);
			videoContainer.videoCurTime=0;
		}
		if (videoContainer.videoCurTime!=0){
			if (videoContainer.videoCurTime==-1){
				video.loop=false;
			}else{
				video.loop=true;
			}
			videoContainer.videoCurTime=0;
		}
		if (videoContainer.videoToPlay==1){
			video.play();
			videoContainer.videoToPlay=0;
		}
		if (videoContainer.videoPause==1){
			video.pause();
			videoContainer.videoPause=0;
		}
	}
}
Magicvideo.prototype.Draw=function(x,y,w,h){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		//this.gc.drawImage(this.videoContainer.video,0,0,this.videoContainer.video.videoWidth,this.videoContainer.video.videoHeight,0,0,100,100);
		this.gc.drawImage(this.videoContainer.video,x,y,w,h);
		if (this.videoContainer.videoToPlay==1){
			this.videoContainer.video.play();
			this.videoContainer.videoToPlay=0;
		}
	}
}
Magicvideo.prototype.Play=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		this.videoContainer.video.play();
	}else{
		this.videoContainer.videoToPlay=1;
	}
}
Magicvideo.prototype.Pause=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		this.videoContainer.video.pause();
	}else{
		this.videoContainer.videoPause=1;
	}
}
Magicvideo.prototype.IsPlayed=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		if (this.videoContainer.video.paused){
			return false;	
		}else{
			return true;			
		}
	}else{
		if (this.videoContainer.videoPause==1){
			return false;	
		}else{
			return true;			
		}
	}
}
Magicvideo.prototype.GetCurrentTime=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		return parseInt(this.videoContainer.video.currentTime*1000);
	}
	return 0;
}
Magicvideo.prototype.SetCurrentTime=function(TimeMilli){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		this.videoContainer.video.currentTime=parseInt(TimeMilli/1000.0);
	}else{
		this.videoContainer.videoCurTime=TimeMilli;	
	}
}
Magicvideo.prototype.GetPlaybackRate=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		return parseFloat(this.videoContainer.video.playbackRate);
	}
	return 1.0;
}
Magicvideo.prototype.SetPlaybackRate=function(Rate){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		this.videoContainer.video.playbackRate=Rate;
	}else{
		this.videoContainer.videoCurTime=Rate;	
	}
}
Magicvideo.prototype.GetDuration=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		return parseInt(this.videoContainer.video.duration*1000);
	}
	return -1;
}
Magicvideo.prototype.GetVolume=function(){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		return parseFloat(this.videoContainer.video.volume);
	}
	return 1.0;
}
Magicvideo.prototype.SetVolume=function(Vol){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		if (Vol>1.0) Vol=1.0;
		if (Vol<0.0) Vol=0.0;
		this.videoContainer.video.muted = false;
		this.videoContainer.video.volume=Vol;
	}else{
		if (Vol>1.0) Vol=1.0;
		if (Vol<0.0) Vol=0.0;
		this.videoContainer.videoCurTime=Vol;	
	}
}
Magicvideo.prototype.SetLoop=function(State){
	if(this.videoContainer !== undefined && this.videoContainer.ready){
		this.videoContainer.video.loop=State;
	}else{
		if (State){
			this.videoContainer.videoCurTime=1;
		}else{
			this.videoContainer.videoCurTime=-1;
		}
	}
}











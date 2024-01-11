import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

declare const window: any;

@Component({
  selector: 'app-course-discussion',
  templateUrl: './course-discussion.component.html',
  styleUrls: ['./course-discussion.component.css'],
})
export class CourseDiscussionComponent {
  microphone: boolean = false;
  spokenText: string = '';
  recognition: any;
  conversation: any = [];

  @ViewChild('scrollMe') scrollMe!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.continuous = true;
    } else {
      console.error('Speech recognition not supported in this browser.');
    }

    this.setWelcomeMessages();
  }

  setWelcomeMessages() {
    var texts: any = [
      'Hello Ahmad!',
      'Welcome to Senastic GMAT Interview Prototype',
      'This is intended to be an Alpha Release. For demo purposes and not production use.',
      "It's wonderful to meet you.",
      "Thanks for taking time out to chat with me. I'd like to cover a few items during our conversation today.",
      'To begin with, it would be great to get a quick introduction from you. Tell me more about yourself...',
    ];

    this.conversation.push({
      name: 'AI',
      messages: [
        {
          datetime: '11:45 am',
          text: texts[0],
        },
      ],
      type: 'ai',
    });

    var i = 1;
    var refreshIntervalId = setInterval(() => {
      this.conversation[0].messages.push({
        datetime: '11:45 am',
        text: texts[i],
      });
      this.scrollToBottom();

      i++;
      if (typeof texts[i] == 'undefined') {
        clearInterval(refreshIntervalId);
      }
    }, 1250);
  }

  sendMessage() {
    const lastMessage: any = this.conversation[this.conversation.length - 1];
    if (lastMessage && lastMessage.type == 'user') {
      this.conversation[this.conversation.length - 1].messages.push({
        datetime: '11:45 am',
        text: this.spokenText,
      });
    } else {
      this.conversation.push({
        name: 'Ahmad',
        messages: [
          {
            datetime: '11:45 am',
            text: this.spokenText,
          },
        ],
        type: 'user',
      });
    }
    this.scrollToBottom();
    this.spokenText = '';
    this.microphone = false;
    this.recognition.abort();

    if (Math.random() < 0.5) {
      this.generateAIRandomMessage();
    }
  }

  generateAIRandomMessage() {
    this.scrollToBottom();
    this.conversation.push({
      name: 'AI',
      messages: [
        {
          datetime: '11:45 am',
          text: "Let's start with grammar. We'll get into talking about the content later on.",
        },
        {
          datetime: '11:45 am',
          text: 'I did want to share a few places where I noticed the opportunity to word things better.',
        },
        {
          datetime: '11:45 am',
          text: 'Are you ready to begin?',
        },
      ],
      type: 'ai',
    });
    this.scrollToBottom();
  }

  toggleMicrophone() {
    this.microphone = this.microphone ? false : true;
    if (this.microphone) {
      if (this.recognition) {
        let previousText = ''; // Variable to store previously recognized text

        this.recognition.onresult = (event: any) => {
          let transcript = ''; // Variable to store accumulated transcript

          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              previousText += transcript + event.results[i][0].transcript + ' ';
              transcript = '';
            } else {
              transcript += event.results[i][0].transcript;
            }
          }

          this.spokenText = previousText + transcript; // Update spokenText with accumulated text

          this.cdr.detectChanges(); // Trigger change detection
        };
        this.recognition.start(); // Start speech recognition
      }
    } else {
      if (this.recognition) {
        this.recognition.abort(); // Abort speech recognition
      }
    }
  }

  // Scroll to bottom function
  scrollToBottom(): void {
    this.cdr.detectChanges(); // Trigger change detection
    const container = this.scrollMe.nativeElement;
    container.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  // Trigger scroll to bottom after view initialization
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
}

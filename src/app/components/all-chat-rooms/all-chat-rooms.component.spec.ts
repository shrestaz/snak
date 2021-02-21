import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChatRoomsComponent } from './all-chat-rooms.component';

describe('AllChatRoomsComponent', () => {
  let component: AllChatRoomsComponent;
  let fixture: ComponentFixture<AllChatRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllChatRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChatRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

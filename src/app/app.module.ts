import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import {
  Message,
  MessageLogger,
  MESSAGE_LOGGERS,
} from "./__shared/central-messages/central-message.types";
import { CentralMessageModule } from "./__shared/central-messages/central-message.module";
import { CentralMessageComponent } from "./__shared/central-messages/central-message.component";

class MessageConsoleLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log("MY CUSTOM CONSOLE LOOGER", message);
  }
}
class MessageServerLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log("Send to server", message);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CentralMessageModule],
  providers: [
    // {
    //   provide: AbstractCentralMessage,
    //   useClass: CustomMessageService
    // },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageConsoleLogger,
      multi: true,
    },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageServerLogger,
      multi: true,
    },
  ],
  bootstrap: [AppComponent, CentralMessageComponent],
})
export class AppModule {}

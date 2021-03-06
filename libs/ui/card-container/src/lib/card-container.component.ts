import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

/**
 * A card container for your widgets with a colored top bar (gradient).
 */
@Component({
  selector: 'gro-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnChanges {
  /**
   * The end color of the gradient in top bar.
   */
  @Input() public colorEnd = '';

  /**
   * The initial color of the gradient in top bar.
   */
  @Input() public colorInit = '';

  /**
   * Additional css classes to card top bar.
   */
  @Input() public cssClass = '';

  /**
   * The title for the card.
   */
  @Input() public title = '';

  /**
   * Sanitized gradient background color for the top bar.
   */
  public gradientBgColor: SafeStyle;

  /**
   * Empty constructor.
   *
   * @param domDanitizer Injectable DomSanitizer instance
   * @see DomSanitizer
   */
  constructor(private domSanitizer: DomSanitizer) {}

  /**
   * Creates a new sanitized gradient color on colorEnd or colorInit change.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.colorEnd || changes.colorInit) {
      const lgradient = 'linear-gradient(to left, ' + this.colorInit + ', ' + this.colorEnd + ')';
      this.gradientBgColor = this.domSanitizer.bypassSecurityTrustStyle(lgradient);
    }
  }
}

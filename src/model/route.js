// @flow
import Comment from './comment';
import Milestone from './milestone';

export default class Route {
  messages = [];
  milestones = [];

  /**
   * 
   * @param {String} webId 
   * @param {String} name 
   * @param {String} description 
   * @param {number} distance 
   * @param {number} slope 
   * @param {number} rank 
   * @param {String} createdBy 
   * @param {Date} createdAt 
   */
  constructor(webId, name, description, distance, slope, rank, createdBy, createdAt) {
    this.webId = webId;
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.slope = slope;
    this.rank = rank;
    this.createdBy = createdBy;
    this.createdAt = createdAt || Date.now();
  }

  /**
   * 
   * @param {Comment} comment 
   */
  linkComment(comment) {
    if (comment && comment instanceof Comment) {
      this.messages.push(comment);
    }
  }

  /**
   * 
   * @param {Milestone} milestone 
   */
  linkMilestone(milestone) {
    if (milestone && milestone instanceof Milestone) {
      this.milestones.push(milestone);
    }
  }

}
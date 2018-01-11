class Ability
  include CanCan::Ability

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def initialize(user)
    user ||= User.new # guest user (not logged in)

    can :manage, User, id: user.id
    can :manage, Profile, user_id: user.id

    can :show, Condition
    can :index, Condition, global: true
    cannot :index, Condition, global: false
    can :index, Condition, global: false, id: user.trackings.where(trackable_type: 'Condition').pluck(:trackable_id)
    can :read, Condition, global: false, id: popular_trackable_ids('Condition')
    can :create, Condition, global: false
    can :manage, Condition, id: user.condition_ids

    can :show, Food
    can :index, Food, global: true
    cannot :index, Food, global: false
    can :index, Food, global: false, id: user.food_ids
    can :create, Food, global: false
    can :manage, Food, id: user.food_ids

    can :read, HarveyBradshawIndex, encrypted_user_id: user.encrypted_id

    can :create, HarveyBradshawIndex do |hbi|
      checkin = hbi.checkin

      checkin.encrypted_user_id == user.encrypted_id && checkin.available_for_hbi?
    end

    can :read, PromotionRate, encrypted_user_id: user.encrypted_id
    can [:create, :update], PromotionRate do |rate|
      checkin = rate.checkin

      checkin.encrypted_user_id == user.encrypted_id && checkin.available_for_promotion?
    end

    can [:create], Pattern
    can [:read, :update, :destroy], Pattern, encrypted_user_id: user.encrypted_id

    can [:read], ChartsPattern

    can :read, [Comment, Post]
    can :create, [Comment, Post], encrypted_user_id: user.encrypted_id

    can :read, Notification
    can :destroy, Notification, encrypted_notify_user_id: user.encrypted_id
    can :update, Notification, encrypted_notify_user_id: user.encrypted_id

    can :read, Postable, encrypted_user_id: user.encrypted_id

    can :read, Reaction
    can [:create, :update, :destroy], Reaction, encrypted_user_id: user.encrypted_id

    can :show, Symptom
    can :index, Symptom, global: true
    cannot :index, Symptom, global: false
    can :index, Symptom, global: false, id: user.trackings.where(trackable_type: 'Symptom').pluck(:trackable_id)
    can :read, Symptom, global: false, id: popular_trackable_ids('Symptom')
    can :create, Symptom, global: false
    can :manage, Symptom, id: user.symptom_ids

    can [:read, :update], TopicFollowing, encrypted_user_id: user.encrypted_id

    can :show, Treatment
    can :index, Treatment, global: true
    cannot :index, Treatment, global: false
    can :index, Treatment, global: false, id: user.trackings.where(trackable_type: 'Treatment').pluck(:trackable_id)
    can :read, Symptom, global: false, id: popular_trackable_ids('Treatment')
    can :create, Treatment, global: false
    can :manage, Treatment, id: user.treatment_ids

    can :manage, Tracking, user_id: user.id

    can :show, Tag
    can :index, Tag, global: true
    cannot :index, Tag, global: false
    can :index, Tag, global: false, id: user.tag_ids
    can :create, Tag, global: false
    can :manage, Tag, id: user.tag_ids

    can :read, Weather if user.persisted?
    can :read, NilClass if user.persisted?

    can [:index, :destroy], Client if user.is_admin?
    can :create, Client if user.is_client?
    can [:show, :update], Client do |client|
      user.is_client? && user.id == client.author_id
    end

    can [:index, :destroy], User if user.is_client?
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength

  private

  def popular_trackable_ids(trackable_class_name)
    user_trackable_class = "User#{trackable_class_name}".constantize
    trackable_id_attr = "#{trackable_class_name.underscore}_id".to_sym
    counts = user_trackable_class.group(trackable_id_attr).count

    min_popularity = Flaredown.config.trackables_min_popularity
    counts.select { |_id, count| count >= min_popularity }.keys
  end
end
